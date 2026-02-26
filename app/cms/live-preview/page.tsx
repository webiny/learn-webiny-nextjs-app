"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// Disable SSR: lexical/rich-text renderer accesses `document` at module load time.
const ArticleLivePreview = dynamic(
  () =>
    import("@/components/Article/ArticleLivePreview").then(
      (m) => m.ArticleLivePreview,
    ),
  { ssr: false },
);

function LivePreviewContent() {
  const searchParams = useSearchParams();
  const editorOrigin = searchParams.get("origin");

  if (!editorOrigin) {
    return (
      <div className="p-8 text-red-600">
        Missing <code>origin</code> query parameter. Live Preview is disabled.
      </div>
    );
  }

  return <ArticleLivePreview editorOrigin={editorOrigin} />;
}

export default function LivePreviewPage() {
  return (
    <Suspense fallback={null}>
      <LivePreviewContent />
    </Suspense>
  );
}
