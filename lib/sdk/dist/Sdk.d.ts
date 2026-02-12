import type { CmsSdkConfig } from "./types.js";
import { CmsSdk } from "./CmsSdk.js";
export type SdkConfig = CmsSdkConfig;
export declare class Sdk {
  readonly cms: CmsSdk;
  constructor(config: SdkConfig);
}
