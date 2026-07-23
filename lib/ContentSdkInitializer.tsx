"use client";

import React from "react";
import type { WebsiteBuilderThemeInput } from "@webiny/website-builder-nextjs";
import { initializeContentSdk } from "./content";

interface ContentSdkInitializerProps {
    draftMode: boolean;
    theme: WebsiteBuilderThemeInput;
    tenantId?: string;
}

export const ContentSdkInitializer = React.memo(
    ({ draftMode, tenantId, theme }: ContentSdkInitializerProps) => {
        initializeContentSdk({ preview: draftMode, apiTenant: tenantId, wb: { theme } });
        return null;
    }
);

ContentSdkInitializer.displayName = "ContentSdkInitializer";
