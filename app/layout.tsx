import React from "react";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { getTenant } from "@/lib/getTenant";
import { ContentSdkInitializer } from "@/lib/ContentSdkInitializer";
import { theme, css } from "@/theme/theme";
import "@/theme/tailwind.css";

export const metadata: Metadata = {
    title: "Learn Webiny Next.js App",
    description: "A Next.js application integrated with Webiny Headless CMS"
};

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isEnabled } = await draftMode();
    const tenantId = await getTenant();

    return (
        <html lang="en">
            <head>
                <style>{css}</style>
            </head>
            <body className="antialiased">
                <ContentSdkInitializer draftMode={isEnabled} tenantId={tenantId} theme={theme} />
                {children}
            </body>
        </html>
    );
}
