/**
 * Represents an Abstract Syntax Tree for a parsed query
 */
interface AST {
  // AST structure will be defined later
}

/**
 * Represents a query execution plan after optimization
 */
interface ExecutionPlan {
  // Execution plan structure will be defined later
}

/**
 * Represents the result of a query execution
 */
interface Result {
  // Result structure will be defined later
}

/**
 * QuerySystem interface defines the contract for parsing, optimizing,
 * and executing database queries.
 */
interface QuerySystem {
  /**
   * Parses a raw query string into an Abstract Syntax Tree (AST)
   * @param query The raw SQL query string to parse
   * @returns AST representation of the query
   */
  parseQuery(query: string): AST;

  /**
   * Optimizes a query by transforming its AST into an efficient execution plan
   * @param ast The Abstract Syntax Tree to optimize
   * @returns An optimized execution plan
   */
  optimizeQuery(ast: AST): ExecutionPlan;

  /**
   * Executes a query based on its execution plan
   * @param plan The execution plan to run
   * @returns The result of the query execution
   */
  executeQuery(plan: ExecutionPlan): Result;
}

export default QuerySystem;
export { AST, ExecutionPlan, Result };
