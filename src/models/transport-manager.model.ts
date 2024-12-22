import { Credentials } from "./auth.model";

/**
 * TransportManager interface defines the contract for managing database connections,
 * client authentication, session management, and load balancing.
 */
interface TransportManager {
  /**
   * Handles new client connections to the database.
   * This includes initial setup and handshake procedures.
   */
  handleConnection(): void;

  /**
   * Authenticates a client attempting to connect to the database.
   * @returns boolean indicating whether authentication was successful
   */
  authenticateClient(credentials: Credentials): Promise<boolean>;

  /**
   * Manages an active client session, including connection state,
   * transaction management, and resource cleanup.
   */
  manageSession(): void;

  /**
   * Performs load balancing across multiple database connections
   * or instances if applicable.
   */
  loadBalance(): void;
}

export default TransportManager;
