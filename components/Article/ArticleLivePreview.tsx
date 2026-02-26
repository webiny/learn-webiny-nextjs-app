import React, { useState } from "react";
import { ReadonlyArticle } from "./types";
import { useLivePreview } from "@/lib/live-preview";
import { Article } from "./Article";

interface ArticleLivePreviewProps {
  editorOrigin: string;
}

export const ArticleLivePreview = ({
  editorOrigin,
}: ArticleLivePreviewProps) => {
  const [article, setArticle] = useState<ReadonlyArticle | undefined>(
    undefined,
  );

  useLivePreview<ReadonlyArticle>({
    editorOrigin,
    onEntry: setArticle,
  });

  if (!article) {
    return null;
  }

  return <Article article={article} />;
};
