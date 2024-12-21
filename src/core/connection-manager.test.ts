import { expect, test, describe, beforeEach } from "vitest";
import ConnectionManager from "./connection-manager";
import { SessionState } from "../models/session.model";

describe("ConnectionManager", () => {
  let connectionManager: ConnectionManager;

  beforeEach(() => {
    connectionManager = new ConnectionManager(2); // Small limit for testing
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
});
