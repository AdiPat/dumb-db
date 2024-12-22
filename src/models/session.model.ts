import { Credentials, SecurityContext } from "./auth.model";

/**
 * Represents a client session in the database
 */
interface Session {
  /**
   * Unique identifier for the session
   */
  id: string;

  /**
   * Timestamp when the session was created
   */
  createdAt: Date;

  /**
   * Current state of the session
   */
  state: SessionState;

  /**
   * Last activity timestamp
   */
  lastActivity: Date;

  /**
   * Client credentials associated with this session
   */
  credentials?: Credentials;

  /**
   * Security context after successful authentication
   */
  securityContext?: SecurityContext;
}

/**
 * Possible states for a database session
 */
enum SessionState {
  CONNECTING = "connecting",
  AUTHENTICATING = "authenticating",
  ACTIVE = "active",
  IDLE = "idle",
  TERMINATED = "terminated",
}

export { Session, SessionState };
