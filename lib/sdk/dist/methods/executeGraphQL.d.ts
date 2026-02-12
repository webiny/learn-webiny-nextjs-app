import type { CmsSdkConfig } from "../types.js";
export declare function executeGraphQL(
  config: CmsSdkConfig,
  fetchFn: typeof fetch,
  query: string,
  variables?: Record<string, unknown>,
): Promise<any>;
