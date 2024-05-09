export async function retry(fn, retries) {
  let attempt = 1;
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      attempt++;
    }
  }
  throw new Error(`Function failed after ${retries} attempts`);
}
