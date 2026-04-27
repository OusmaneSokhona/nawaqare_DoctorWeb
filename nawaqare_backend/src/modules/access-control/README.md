# Access Control Module

Gestion complète du contrôle d'accès aux données de santé dans NawaQare.

## Vue d'ensemble

Ce module permet aux patients de:
- Voir qui a accès à leurs données médicales
- Révoquer ou modifier les accès accordés
- Consulter l'historique complet d'accès
- Gérer leurs sessions actives

Aux médecins de:
- Demander l'accès aux données d'un patient
- Vérifier leur niveau d'accès actuel
- Accéder d'urgence en cas de besoin (break-glass)
- Voir leurs demandes d'accès en cours

## Architecture

### Tables utilisées
- `Consent`: Gestion des consentements (MEDICAL_RECORD_ACCESS, DATA_PROCESSING, RESEARCH_ANONYMIZED)
- `AuditLog`: Logs complets de tous les accès (READ, WRITE, EXPORT, EMERGENCY_ACCESS)
- `Session`: Sessions actives des utilisateurs

### Enums
- `ConsentType`: Types de consentement
- `AuditAction`: Types d'actions auditées

## API Endpoints

### Pour les PATIENTS

#### GET /access-control/me/authorized
Retourne la liste des personnes/systèmes avec accès aux données.

**Réponse:**
```json
[
  {
    "id": "uuid",
    "name": "Dr. Jean Dupont",
    "email": "jean@example.com",
    "role": "DOCTOR",
    "accessType": "READ",
    "grantedAt": "2024-01-15T10:00:00Z",
    "accessLevel": "READ",
    "scope": ["MEDICAL_RECORD", "CONSULTATION_NOTES"]
  }
]
```

#### GET /access-control/me/history?limit=50&offset=0&action=READ
Retourne l'historique d'accès enrichi.

**Query params:**
- `limit`: Nombre d'entrées (défaut: 50)
- `offset`: Pagination offset (défaut: 0)
- `action`: Filtrer par action (READ, WRITE, EXPORT, EMERGENCY_ACCESS)

**Réponse:**
```json
[
  {
    "id": "uuid",
    "timestamp": "2024-01-20T15:30:00Z",
    "action": "READ",
    "actor": {
      "id": "uuid",
      "name": "Dr. Jean Dupont",
      "role": "DOCTOR"
    },
    "resourceType": "MEDICAL_RECORD",
    "details": {
      "scope": ["CONSULTATION_NOTES"]
    },
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0...",
    "isEmergency": false
  }
]
```

#### GET /access-control/me/consents
Retourne tous les consentements du patient.

**Réponse:**
```json
[
  {
    "id": "uuid",
    "type": "MEDICAL_RECORD_ACCESS",
    "granted": true,
    "grantedAt": "2024-01-15T10:00:00Z",
    "revokedAt": null,
    "version": "1.0",
    "isActive": true
  }
]
```

#### PUT /access-control/me/consents/{type}
Met à jour un consentement. Types: `MEDICAL_RECORD_ACCESS`, `DATA_PROCESSING`, `RESEARCH_ANONYMIZED`

**Body:**
```json
{
  "granted": false
}
```

#### GET /access-control/me/sessions
Retourne les sessions actives du patient.

**Réponse:**
```json
[
  {
    "id": "uuid",
    "deviceInfo": "iPhone 14 - Safari",
    "ipAddress": "192.168.1.100",
    "lastActive": "2024-01-20T16:30:00Z",
    "createdAt": "2024-01-19T10:00:00Z"
  }
]
```

#### DELETE /access-control/me/sessions/{sessionId}
Déconnecte une session spécifique.

---

### Pour les MÉDECINS

#### POST /access-control/request
Demande accès aux données d'un patient.

**Body:**
```json
{
  "patientId": "uuid",
  "accessType": "READ",
  "scope": ["CONSULTATION_NOTES", "PRESCRIPTIONS"],
  "duration": "2024-02-15T10:00:00Z",
  "reason": "Consultation de suivi"
}
```

**Réponse:**
```json
{
  "message": "Access request submitted",
  "patientId": "uuid",
  "accessType": "READ",
  "status": "PENDING"
}
```

#### GET /access-control/my-requests
Retourne toutes les demandes d'accès en cours.

**Réponse:**
```json
[
  {
    "id": "uuid",
    "patientId": "uuid",
    "accessType": "READ",
    "scope": ["CONSULTATION_NOTES"],
    "reason": "Consultation de suivi",
    "duration": "2024-02-15T10:00:00Z",
    "status": "PENDING",
    "requestedAt": "2024-01-20T10:00:00Z"
  }
]
```

#### GET /access-control/check/{patientId}
Vérifie le niveau d'accès actuel au patient.

**Réponse:**
```json
{
  "level": "READ",
  "grantedAt": "2024-01-15T10:00:00Z",
  "expiresAt": null,
  "scope": ["MEDICAL_RECORD"]
}
```

Réponse quand pas d'accès:
```json
{
  "level": "NONE"
}
```

#### POST /access-control/emergency/{patientId}
Demande un accès d'urgence (break-glass) avec justification obligatoire.

**Body:**
```json
{
  "justification": "Patient en état critique aux urgences - accès immédiat nécessaire pour historique allergies et médicaments"
}
```

**Réponse:**
```json
{
  "id": "uuid",
  "message": "Emergency access granted - action logged for audit",
  "patientId": "uuid",
  "accessType": "EMERGENCY_READ",
  "grantedAt": "2024-01-20T16:45:00Z",
  "justification": "Patient en état critique aux urgences..."
}
```

## Flux de sécurité

### Consentement normal
1. Patient accorde consentement via `PUT /access-control/me/consents/{type}`
2. Médecin demande accès via `POST /access-control/request`
3. Accès enregistré dans AuditLog avec action=READ/WRITE
4. Patient peut voir l'accès via `GET /access-control/me/authorized`
5. Patient peut révoquer via `PUT /access-control/me/consents/{type}` avec `granted: false`

### Accès d'urgence (Break-Glass)
1. Médecin appelle `POST /access-control/emergency/{patientId}` avec justification
2. Accès est **immédiatement accordé** (pas d'attente)
3. Action complète est loggée avec `AuditAction.EMERGENCY_ACCESS`
4. Patient voit cet accès avec `isEmergency: true` dans l'historique
5. L'audit log contient la justification complète

### Révocation
1. Patient met à jour consentement: `PUT /access-control/me/consents/{type}` avec `granted: false`
2. Consentement reçoit un `revoked_at` timestamp
3. Les futurs accès sont refusés
4. L'historique reste visible (traçabilité)

## Détails d'implémentation

### getAuthorizedActors
- Cherche dans AuditLog les actions READ/WRITE/EXPORT des 90 derniers jours
- Déduplique par actor_uuid
- Détermine le niveau d'accès (READ vs READ_WRITE) basé sur les actions

### getAccessHistory
- Retourne tous les AuditLogs pour le patient cible
- Enrichi avec infos du profil de l'acteur
- Marque les accès d'urgence avec `isEmergency: true`
- Pagination supportée

### requestEmergencyAccess
- Crée un AuditLog avec `AuditAction.EMERGENCY_ACCESS`
- Exige justification minimum 10 caractères
- Ne vérifie pas le consentement (cas d'urgence)
- Tout est loggé pour l'audit

### Scope management
- Extraits des détails du AuditLog
- Peut être: `["GENERAL"]`, `["CONSULTATION_NOTES"]`, `["PRESCRIPTIONS"]`, `["VACCINATIONS"]`, etc.
- Utilisés pour contrôler l'accès granulaire

## Sécurité

1. **Audit complet**: Tout accès est loggé dans AuditLog
2. **Révocation**: Le patient peut révoquer l'accès n'importe quand
3. **Break-Glass**: Accès d'urgence tracé avec justification
4. **Consentements versionnés**: Historique des consentements
5. **Sessions**: Patients peuvent voir et révoquer des sessions

## Intégration avec patients.service.ts

### getPatientTimeline (enrichie)
Retourne chronologie des événements de santé avec:
- **CONSULTATION**: Consultation médicale avec diagnostic et évaluation
- **VACCINATION**: Vaccination avec numéro de dose
- **PRESCRIPTION**: Ordonnances avec détails des médicaments
- **EXAM**: Examens commandés

### getPatientOverview
Vue 30 secondes incluant:
- Profil patient (âge, groupe sanguin, genre)
- Médecin traitant
- Dernière consultation
- Allergies actives
- Top 5 médicaments actifs
- Constantes vitales (placeholder)
- Vaccins en attente
- Événements récents
