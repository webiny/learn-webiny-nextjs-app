import { Sdk } from "@webiny/sdk";

const API_ENDPOINT = process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_KEY!;
const API_TOKEN = process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_HOST!;
const API_TENANT = process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_TENANT || "root";

if (!API_ENDPOINT || !API_TOKEN) {
    throw new Error(
        "Missing required environment variables: WEBINY_API_ENDPOINT and WEBINY_API_TOKEN"
    );
}

// Initialize and export the SDK
export const sdk = new Sdk({
    token: API_TOKEN,
    endpoint: API_ENDPOINT,
    tenant: API_TENANT
});

// TODO: move to content sdk
export type Language = Awaited<
    ReturnType<typeof webinySdk.languages.listLanguages>
>["value"][number];
