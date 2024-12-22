/**
 * Represents authentication credentials for database connections
 */
export interface Credentials {
  username: string;
  password: string;
  clientCertificate?: string; // Optional SSL/TLS client certificate
}

/**
 * Represents the authentication result with additional security context
 */
export interface AuthResult {
  success: boolean;
  sessionId?: string;
  error?: string;
  securityContext?: SecurityContext;
}

/**
 * Represents the security context for an authenticated session
 */
export interface SecurityContext {
  issuedAt: Date;
  expiresAt: Date;
  permissions: string[];
  tlsVersion?: string;
  cipherSuite?: string;
}
