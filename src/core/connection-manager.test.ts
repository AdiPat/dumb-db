import { expect, test, describe, beforeEach } from "vitest";
import ConnectionManager from "./connection-manager";
import { SessionState } from "../models/session.model";
import { Credentials } from "../models/auth.model";

describe("ConnectionManager", () => {
  let connectionManager: ConnectionManager;
  let validCredentials: Credentials;

  beforeEach(() => {
    connectionManager = new ConnectionManager(2); // Small limit for testing
    validCredentials = {
      username: "testuser",
      password: "correctpassword",
    };
  });

  test("handleConnection should create a new session", () => {
    const session = connectionManager.handleConnection();

    expect(session.id).toBeDefined();
    expect(session.state).toBe(SessionState.CONNECTING);
    expect(session.createdAt).toBeInstanceOf(Date);
    expect(session.lastActivity).toBeInstanceOf(Date);
  });

  test("handleConnection should enforce session limits", () => {
    connectionManager.handleConnection();
    connectionManager.handleConnection();

    expect(() => connectionManager.handleConnection()).toThrow(
      "Maximum session limit reached"
    );
  });

  test("sessions should be tracked in the sessions map", () => {
    const session = connectionManager.handleConnection();
    const sessions = connectionManager.getSessions();

    expect(sessions.get(session.id)).toBeDefined();
    expect(sessions.size).toBe(1);
  });

  describe("Authentication", () => {
    test("should authenticate valid credentials for existing session", async () => {
      const session = connectionManager.handleConnection();
      session.credentials = validCredentials;

      const result = await connectionManager.authenticateClient(
        validCredentials
      );

      expect(result).toBe(true);
      const updatedSession = connectionManager.getSessions().get(session.id);
      expect(updatedSession?.state).toBe(SessionState.ACTIVE);
      expect(updatedSession?.securityContext).toBeDefined();
    });

    test("should fail authentication for non-existent session", async () => {
      const result = await connectionManager.authenticateClient(
        validCredentials
      );
      expect(result).toBe(false);
    });

    test("should update session state to TERMINATED on failed authentication", async () => {
      const session = connectionManager.handleConnection();
      session.credentials = {
        username: "testuser",
        password: "wrongpassword",
      };

      const result = await connectionManager.authenticateClient({
        username: "testuser",
        password: "wrongpassword",
      });

      expect(result).toBe(false);
      expect(session.state).toBe(SessionState.TERMINATED);
    });

    test("should update lastActivity timestamp on successful authentication", async () => {
      const session = connectionManager.handleConnection();
      session.credentials = validCredentials;
      const originalTimestamp = session.lastActivity;

      await new Promise((resolve) => setTimeout(resolve, 10)); // Small delay
      await connectionManager.authenticateClient(validCredentials);

      const updatedSession = connectionManager.getSessions().get(session.id);
      expect(updatedSession?.lastActivity.getTime()).toBeGreaterThan(
        originalTimestamp.getTime()
      );
    });
  });
});
