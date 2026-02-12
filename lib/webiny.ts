import { Sdk } from "./sdk/dist";

const API_HOST = process.env.WEBINY_API_HOST!;
const API_TOKEN = process.env.WEBINY_API_TOKEN!;
const API_TENANT = process.env.WEBINY_API_TENANT || "root";

if (!API_HOST || !API_TOKEN) {
  throw new Error(
    "Missing required environment variables: WEBINY_API_HOST and WEBINY_API_TOKEN",
  );
}

// Initialize and export the SDK
export const sdk = new Sdk({
  apiToken: API_TOKEN,
  apiHost: API_HOST,
  apiTenant: API_TENANT,
});

export * from "./sdk/dist";
