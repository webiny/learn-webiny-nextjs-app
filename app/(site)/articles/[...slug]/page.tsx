import React from "react";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { initializeContentSdk, contentSdk } from "@/lib/content";
import { getTenant } from "@/lib/getTenant";
import { Article } from "@/components/Article/Article";
import type { Metadata } from "next";

interface ArticlePageProps {
    params: Promise<{ slug: string[] }>;
    searchParams: Promise<Record<string, string>>;
}

export async function generateStaticParams() {
    initializeContentSdk({ apiTenant: await getTenant() });

    const result = await contentSdk.cms.listEntries({
        modelId: "article"
    });

    return result.data.map(entry => {
        const values = entry.values as Record<string, unknown>;
        const slug = values.slug as string;
        return { slug: slug.split("/") };
    });
}

async function getEntry(slug: string[], searchParams: Record<string, string>) {
    const { isEnabled } = await draftMode();
    initializeContentSdk({ preview: isEnabled, apiTenant: await getTenant() });

    const entryId = searchParams["wb.id"];
    if (entryId) {
        return contentSdk.cms.getEntry({ modelId: "article", entryId });
    }

    const slugValue = slug.join("/");
    const result = await contentSdk.cms.listEntries({
        modelId: "article",
        where: { values: { slug: slugValue } },
        limit: 1
    });

    return result.data.length > 0 ? result.data[0] : null;
}

export async function generateMetadata({
    params,
    searchParams
}: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const search = await searchParams;
    const entry = await getEntry(slug, search);

    if (!entry) {
        return {};
    }

    const values = entry.values as Record<string, unknown>;
    return {
        title: (values.title as string) ?? undefined,
        description: (values.description as string) ?? undefined
    };
}

export default async function ArticlePage({ params, searchParams }: ArticlePageProps) {
    const { slug } = await params;
    const search = await searchParams;

    initializeContentSdk({ apiTenant: await getTenant() });

    const model = await contentSdk.cms.getModel("article");
    const entry = await getEntry(slug, search);

    if (!entry || !model) {
        return notFound();
    }

    return (
        <main className="pb-12">
            <Article entry={entry} model={model} />
        </main>
    );
}
