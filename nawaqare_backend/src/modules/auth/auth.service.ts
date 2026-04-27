import { Injectable, BadRequestException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { phone } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (existingUser) {
      throw new ConflictException('Phone number already registered');
    }

    // Generate OTP and registration_id
    const otp = this.generateOtp();
    const registrationId = crypto.randomUUID();
    const codeHash = await bcrypt.hash(otp, 10);

    // Create OTP record
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10);

    await this.prisma.otpCode.create({
      data: {
        registration_id: registrationId,
        phone,
        code_hash: codeHash,
        expires_at: otpExpiresAt,
        used: false,
      },
    });

    // In production, send OTP via SMS
    // await this.smsSender.send(phone, `Your OTP is: ${otp}`);

    return {
      registration_id: registrationId,
      message: 'OTP sent to phone',
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto, isNewUser: boolean = true) {
    const { registration_id, code, first_name, last_name } = verifyOtpDto;

    const otpRecord = await this.prisma.otpCode.findUnique({
      where: { registration_id },
    });

    if (!otpRecord) {
      throw new BadRequestException('Invalid registration ID');
    }

    if (otpRecord.used) {
      throw new BadRequestException('OTP has already been used');
    }

    if (new Date() > otpRecord.expires_at) {
      throw new BadRequestException('OTP has expired');
    }

    const isCodeValid = await bcrypt.compare(code, otpRecord.code_hash);
    if (!isCodeValid) {
      throw new BadRequestException('Invalid OTP code');
    }

    // Mark OTP as used
    await this.prisma.otpCode.update({
      where: { registration_id },
      data: { used: true },
    });

    let user = await this.prisma.user.findUnique({
      where: { phone: otpRecord.phone },
      include: { profile: true },
    });

    if (!user && isNewUser) {
      // Create new user and profile
      user = await this.prisma.user.create({
        data: {
          phone: otpRecord.phone,
          role: 'PATIENT',
          is_active: true,
        },
        include: { profile: true },
      });

      if (first_name && last_name) {
        await this.prisma.userProfile.create({
          data: {
            user_id: user.id,
            first_name,
            last_name,
          },
        });
        user.profile = await this.prisma.userProfile.findUnique({
          where: { user_id: user.id },
        });
      }
    } else if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('User account is inactive');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.phone, user.role);

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
        profile: user.profile,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { phone } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      throw new UnauthorizedException('Phone number not found');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('User account is inactive');
    }

    // Generate OTP and registration_id for login
    const otp = this.generateOtp();
    const registrationId = crypto.randomUUID();
    const codeHash = await bcrypt.hash(otp, 10);

    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10);

    await this.prisma.otpCode.create({
      data: {
        registration_id: registrationId,
        phone,
        code_hash: codeHash,
        expires_at: otpExpiresAt,
        used: false,
      },
    });

    // In production, send OTP via SMS
    // await this.smsSender.send(phone, `Your OTP is: ${otp}`);

    return {
      registration_id: registrationId,
      message: 'OTP sent to phone',
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
      });

      if (!user || !user.is_active) {
        throw new UnauthorizedException('User not found or inactive');
      }

      const tokens = await this.generateTokens(user.id, user.phone, user.role);
      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    // Revoke all refresh tokens for user
    await this.prisma.refreshToken.updateMany({
      where: { user_id: userId },
      data: { revoked: true },
    });
  }

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return {
      id: user.id,
      phone: user.phone,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      profile: user.profile,
      created_at: user.created_at,
    };
  }

  private async generateTokens(userId: string, phone: string, role: string) {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const accessTtl = this.configService.get<number>('JWT_ACCESS_TTL') || 900;
    const refreshTtl = this.configService.get<number>('JWT_REFRESH_TTL') || 604800;

    const payload = {
      sub: userId,
      phone,
      role,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: accessTtl,
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: refreshTtl,
    });

    // Store refresh token hash in DB
    const refreshTokenHash = crypto.createHash('sha256').update(refresh_token).digest('hex');
    const refreshTokenExpiresAt = new Date();
    refreshTokenExpiresAt.setSeconds(refreshTokenExpiresAt.getSeconds() + refreshTtl);

    await this.prisma.refreshToken.create({
      data: {
        user_id: userId,
        token_hash: refreshTokenHash,
        expires_at: refreshTokenExpiresAt,
      },
    });

    return {
      access_token,
      refresh_token,
      expires_in: accessTtl,
    };
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
