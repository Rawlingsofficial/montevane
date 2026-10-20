// Postgres error code for a unique-constraint violation.
const UNIQUE_VIOLATION = "23505";

/** Turns a driver error into a message fit for an admin form. */
export function pgErrorMessage(error: unknown, duplicateMessage: string): string {
  const cause = (error as { cause?: { code?: string } })?.cause ?? (error as { code?: string });
  if (cause?.code === UNIQUE_VIOLATION) return duplicateMessage;
  return error instanceof Error ? error.message : "Something went wrong.";
}
