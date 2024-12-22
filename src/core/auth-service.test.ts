import { expect, test, describe, beforeEach } from "vitest";
import { AuthService } from "./auth-service";
import { Credentials } from "../models/auth.model";

describe("AuthService", () => {
  let authService: AuthService;
  let validCredentials: Credentials;
  let invalidCredentials: Credentials;

  beforeEach(() => {
    authService = new AuthService();
    validCredentials = {
      username: "testuser",
      password: "correctpassword",
    };
    invalidCredentials = {
      username: "testuser",
      password: "wrongpassword",
    };
  });

  test("should successfully authenticate with valid credentials", async () => {
    const result = await authService.authenticate(validCredentials);

    expect(result.success).toBe(true);
    expect(result.sessionId).toBeDefined();
    expect(result.error).toBeUndefined();
    expect(result.securityContext).toBeDefined();
  });

  test("should fail authentication with invalid credentials", async () => {
    const result = await authService.authenticate(invalidCredentials);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Invalid credentials");
    expect(result.sessionId).toBeUndefined();
    expect(result.securityContext).toBeUndefined();
  });

  test("should validate TLS certificate when provided", async () => {
    const credentials: Credentials = {
      ...validCredentials,
      clientCertificate: "valid-cert",
    };

    const result = await authService.authenticate(credentials);
    expect(result.success).toBe(true);
    expect(result.securityContext?.tlsVersion).toBe("TLSv1.3");
  });

  test("should create valid security context", async () => {
    const result = await authService.authenticate(validCredentials);
    const context = result.securityContext;

    expect(context).toBeDefined();
    if (context) {
      expect(context.issuedAt).toBeInstanceOf(Date);
      expect(context.expiresAt).toBeInstanceOf(Date);
      expect(context.permissions).toContain("read");
      expect(context.permissions).toContain("write");
      expect(context.cipherSuite).toBe("TLS_AES_256_GCM_SHA384");
    }
  });

  test("should handle authentication errors gracefully", async () => {
    const result = await authService.authenticate({
      username: "",
      password: "",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
