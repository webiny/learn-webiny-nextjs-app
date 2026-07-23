import React from "react";
import { initializeContentSdk, contentSdk } from "@/lib/content";
import { getTenant } from "@/lib/getTenant";
import { Article } from "@/components/Article/Article";

export default async function ArticlePreviewPage() {
    initializeContentSdk({ apiTenant: await getTenant() });
    const model = await contentSdk.cms.getModel("article");

    if (!model) {
        return null;
    }

    return (
        <main className="pb-12">
            <Article entry={null} model={model} isEditing />
        </main>
    );
}
