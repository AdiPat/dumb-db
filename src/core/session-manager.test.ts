import { expect, test, describe, beforeEach } from "vitest";
import SessionManager from "./session-manager";
import { SessionState } from "../models/session.model";

describe("SessionManager", () => {
  let sessionManager: SessionManager;

  beforeEach(() => {
    sessionManager = new SessionManager(2); // Small limit for testing
  });

  test("handleConnection should create a new session", () => {
    const session = sessionManager.handleConnection();

    expect(session.id).toBeDefined();
    expect(session.state).toBe(SessionState.CONNECTING);
    expect(session.createdAt).toBeInstanceOf(Date);
    expect(session.lastActivity).toBeInstanceOf(Date);
  });

  test("handleConnection should enforce session limits", () => {
    sessionManager.handleConnection();
    sessionManager.handleConnection();

    expect(() => sessionManager.handleConnection()).toThrow(
      "Maximum session limit reached"
    );
  });

  test("sessions should be tracked in the sessions map", () => {
    const session = sessionManager.handleConnection();
    const sessions = sessionManager.getSessions();

    expect(sessions.get(session.id)).toBeDefined();
    expect(sessions.size).toBe(1);
  });
});
