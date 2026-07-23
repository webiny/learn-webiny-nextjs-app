import React from "react";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { DocumentRenderer } from "@/pageComponents/DocumentRenderer";
import { initializeContentSdk, contentSdk } from "@/lib/content";
import { getTenant } from "@/lib/getTenant";
import { normalizeSlug } from "@/lib/normalizeSlug";

type PageProps = {
    params: Promise<{ slug: string[] }>;
    searchParams: Promise<Record<string, string>>;
};

export async function generateStaticParams() {
    initializeContentSdk({ apiTenant: await getTenant() });

    const pages = await contentSdk.wb.listPages();

    return pages.data.map(page => {
        const path = page.properties.path;

        return {
            slug: path.split("/").slice(1)
        };
    });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    initializeContentSdk({ apiTenant: await getTenant() });

    const { slug = "" } = await params;
    const normalizedSlug = normalizeSlug(slug);

    const page = await contentSdk.wb.getPage(normalizedSlug);

    if (!page) {
        return {};
    }

    const title = page.properties.seo?.title ?? page.properties.title;
    const ogTitle = page.properties.social?.title ?? title;

    const description = page.properties.seo?.description ?? page.properties.description;
    const ogDescription = page.properties.social?.description ?? description;

    const otherSeoTags = page.properties.seo?.metaTags.reduce((acc, item) => {
        return { ...acc, [item.name]: item.content };
    }, {});

    const otherOgTags = page.properties.social?.metaTags.reduce((acc, item) => {
        return { ...acc, [item.property]: item.content };
    }, {});

    return {
        title,
        description,
        openGraph: {
            type: "website",
            url: `https://example.com${normalizedSlug}`,
            title: ogTitle,
            description: ogDescription,
            siteName: "My Website"
        },
        other: {
            ...otherSeoTags,
            ...otherOgTags
        }
    };
}

async function getPage(path: string) {
    const { isEnabled } = await draftMode();

    initializeContentSdk({ preview: isEnabled, apiTenant: await getTenant() });

    return await contentSdk.wb.getPage(path);
}

export default async function Page({ params, searchParams }: PageProps) {
    const { slug = [] } = await params;
    const search = await searchParams;

    const isEditing = search["wb.editing"] === "true";

    const page = await getPage(normalizeSlug(slug));

    return <DocumentRenderer document={page} isEditing={isEditing} />;
}
