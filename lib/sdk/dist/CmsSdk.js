import { getEntry as getEntryFn } from "./methods/getEntry.js";
import { getEntryRevisionById as getEntryRevisionByIdFn } from "./methods/getEntryRevisionById.js";
import { listEntries as listEntriesFn } from "./methods/listEntries.js";
import { createEntry as createEntryFn } from "./methods/createEntry.js";
import { updateEntryRevision as updateEntryRevisionFn } from "./methods/updateEntryRevision.js";
import { deleteEntryRevision as deleteEntryRevisionFn } from "./methods/deleteEntryRevision.js";
import { publishEntryRevision as publishEntryRevisionFn } from "./methods/publishEntryRevision.js";
import { unpublishEntryRevision as unpublishEntryRevisionFn } from "./methods/unpublishEntryRevision.js";
export class CmsSdk {
  constructor(config) {
    this.config = config;
    this.fetchFn = config.fetch || fetch;
  }
  async getEntry(params) {
    return getEntryFn(this.config, this.fetchFn, params);
  }
  async getEntryRevisionById(params) {
    return getEntryRevisionByIdFn(this.config, this.fetchFn, params);
  }
  async listEntries(params) {
    return listEntriesFn(this.config, this.fetchFn, params);
  }
  async createEntry(params) {
    return createEntryFn(this.config, this.fetchFn, params);
  }
  async updateEntryRevision(params) {
    return updateEntryRevisionFn(this.config, this.fetchFn, params);
  }
  async deleteEntryRevision(params) {
    return deleteEntryRevisionFn(this.config, this.fetchFn, params);
  }
  async publishEntryRevision(params) {
    return publishEntryRevisionFn(this.config, this.fetchFn, params);
  }
  async unpublishEntryRevision(params) {
    return unpublishEntryRevisionFn(this.config, this.fetchFn, params);
  }
}

//# sourceMappingURL=CmsSdk.js.map
