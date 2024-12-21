/**
 * TransactionSystem interface defines the contract for managing database
 * transactions, including ACID properties and recovery mechanisms.
 */
interface TransactionSystem {
  /**
   * Begins a new database transaction
   * Creates a new transaction context and initializes necessary logs
   */
  beginTransaction(): void;

  /**
   * Commits the current transaction
   * Ensures all changes are permanently saved to the database
   */
  commit(): void;

  /**
   * Rolls back the current transaction
   * Reverts all changes made during the transaction
   */
  rollback(): void;

  /**
   * Creates a checkpoint in the transaction log
   * Helps in recovery and managing system resources
   */
  checkpoint(): void;
}

export default TransactionSystem;
