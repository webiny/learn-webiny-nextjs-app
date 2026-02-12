import type { CmsSdkConfig } from "../types.js";
export interface DeleteEntryRevisionParams {
  modelId: string;
  revisionId: string;
  permanent?: boolean;
}
export declare function deleteEntryRevision(
  config: CmsSdkConfig,
  fetchFn: typeof fetch,
  params: DeleteEntryRevisionParams,
): Promise<boolean>;
