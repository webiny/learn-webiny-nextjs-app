import type { CmsSdkConfig } from "./types.js";
import type { GetEntryParams, CmsEntryData } from "./methods/getEntry.js";
import type { GetEntryRevisionByIdParams } from "./methods/getEntryRevisionById.js";
import type {
  ListEntriesParams,
  ListEntriesResult,
} from "./methods/listEntries.js";
import type {
  CreateEntryParams,
  CreateCmsEntryData,
  CmsEntryValues,
} from "./methods/createEntry.js";
import type {
  UpdateEntryRevisionParams,
  UpdateCmsEntryData,
} from "./methods/updateEntryRevision.js";
import type { DeleteEntryRevisionParams } from "./methods/deleteEntryRevision.js";
import type { PublishEntryRevisionParams } from "./methods/publishEntryRevision.js";
import type { UnpublishEntryRevisionParams } from "./methods/unpublishEntryRevision.js";
export declare class CmsSdk {
  private config;
  private fetchFn;
  constructor(config: CmsSdkConfig);
  getEntry<TValues extends CmsEntryValues = CmsEntryValues>(
    params: GetEntryParams,
  ): Promise<CmsEntryData<TValues> | null>;
  getEntryRevisionById<TValues extends CmsEntryValues = CmsEntryValues>(
    params: GetEntryRevisionByIdParams,
  ): Promise<CmsEntryData<TValues> | null>;
  listEntries<TValues extends CmsEntryValues = CmsEntryValues>(
    params: ListEntriesParams,
  ): Promise<ListEntriesResult<TValues>>;
  createEntry<TValues extends CmsEntryValues = CmsEntryValues>(
    params: CreateEntryParams<TValues>,
  ): Promise<CreateCmsEntryData<TValues>>;
  updateEntryRevision<TValues extends CmsEntryValues = CmsEntryValues>(
    params: UpdateEntryRevisionParams<TValues>,
  ): Promise<UpdateCmsEntryData<TValues>>;
  deleteEntryRevision(params: DeleteEntryRevisionParams): Promise<boolean>;
  publishEntryRevision<TValues extends CmsEntryValues = CmsEntryValues>(
    params: PublishEntryRevisionParams,
  ): Promise<CmsEntryData<TValues>>;
  unpublishEntryRevision<TValues extends CmsEntryValues = CmsEntryValues>(
    params: UnpublishEntryRevisionParams,
  ): Promise<CmsEntryData<TValues>>;
}
