import { cacheLife } from "next/cache";

// Cached (and refreshed daily) so the year is part of the static shell and
// identical on server and client: no hydration mismatch.
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
