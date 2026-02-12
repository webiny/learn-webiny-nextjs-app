import type { CmsSdkConfig } from "../types.js";
/**
 * Entry values type.
 */
export interface CmsEntryValues {
  [key: string]: any;
}
/**
 * Entry status type.
 */
export type CmsEntryStatus = "published" | "unpublished" | "draft";
/**
 * CMS identity.
 */
export interface CmsIdentity {
  /**
   * ID of the user.
   */
  id: string;
  /**
   * Full name of the user.
   */
  displayName: string;
  /**
   * Type of the user (admin, user).
   */
  type: string;
}
/**
 * CMS entry data returned from queries.
 */
export interface CmsEntryData<TValues extends CmsEntryValues = CmsEntryValues> {
  id?: string;
  entryId?: string;
  status?: CmsEntryStatus;
  /**
   * Entry-level meta fields.
   */
  createdOn?: Date | string;
  modifiedOn?: Date | string | null;
  savedOn?: Date | string;
  deletedOn?: Date | string | null;
  restoredOn?: Date | string | null;
  createdBy?: CmsIdentity;
  modifiedBy?: CmsIdentity;
  savedBy?: CmsIdentity;
  deletedBy?: CmsIdentity | null;
  restoredBy?: CmsIdentity | null;
  firstPublishedOn?: Date | string;
  lastPublishedOn?: Date | string;
  firstPublishedBy?: CmsIdentity;
  lastPublishedBy?: CmsIdentity;
  /**
   * Revision-level meta fields.
   */
  revisionCreatedOn?: Date | string;
  revisionModifiedOn?: Date | string | null;
  revisionSavedOn?: Date | string;
  revisionDeletedOn?: Date | string | null;
  revisionRestoredOn?: Date | string | null;
  revisionCreatedBy?: CmsIdentity;
  revisionModifiedBy?: CmsIdentity | null;
  revisionSavedBy?: CmsIdentity;
  revisionDeletedBy?: CmsIdentity | null;
  revisionRestoredBy?: CmsIdentity | null;
  revisionFirstPublishedOn?: Date | string;
  revisionLastPublishedOn?: Date | string;
  revisionFirstPublishedBy?: CmsIdentity;
  revisionLastPublishedBy?: CmsIdentity;
  location?: {
    folderId?: string | null;
  };
  values?: TValues;
}
export interface ListEntriesParams {
  modelId: string;
  where?: Record<string, unknown>;
  sort?: Record<string, "asc" | "desc">;
  limit?: number;
  after?: string;
  fields: string[];
  preview?: boolean;
}
export interface ListEntriesResult<
  TValues extends CmsEntryValues = CmsEntryValues,
> {
  data: CmsEntryData<TValues>[];
  meta: {
    cursor: string | null;
    hasMoreItems: boolean;
    totalCount: number;
  };
}
/**
 * Lists entries from the CMS with filtering, sorting, and pagination support.
 *
 * @template TValues - Type of the entry data objects. Users should specify this to include all fields they're requesting (id, entryId, values, createdOn, etc.)
 * @param config - SDK configuration
 * @param fetchFn - Fetch function to use for HTTP requests
 * @param params - Parameters for listing entries
 * @param params.modelId - The model ID of entries to list
 * @param params.where - Optional where conditions to filter entries
 * @param params.sort - Optional sort configuration
 * @param params.limit - Maximum number of entries to return (default: 10)
 * @param params.after - Cursor for pagination
 * @param params.fields - Specific fields to return. Use "values." prefix for entry values (e.g., "values.author.name") or specify top-level fields like "createdOn"
 * @param params.preview - When true, uses preview API to access unpublished/draft content. When false (default), uses read API for published content only.
 * @returns List of entries with pagination metadata
 */
export declare function listEntries<
  TValues extends CmsEntryValues = CmsEntryValues,
>(
  config: CmsSdkConfig,
  fetchFn: typeof fetch,
  params: ListEntriesParams,
): Promise<ListEntriesResult<TValues>>;
