import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const SimpleHeader: FC = () => {
  return (
    <div className="w-full h-[85px] sm:h-[120px] z-10 flex items-center justify-center bg-transparent">
      <Link className="w-max" href="/">
        <Image
          width={314}
          height={100}
          className="w-[250px] md:w-full"
          src="/assets/svg/logo_1.svg"
          alt="Logo"
        />
      </Link>
    </div>
  );
};

export default SimpleHeader;
