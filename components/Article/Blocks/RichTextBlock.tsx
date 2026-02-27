import React from "react";
import { GenericBlock, RichTextBlock } from "../types";

export const isRichTextBlock = (
  block: GenericBlock,
): block is RichTextBlock => {
  return block.__typename === "Article_Content_Richtextfield";
};

interface RichTextBlockComponentProps {
  block: RichTextBlock;
}

export const RichTextBlockComponent = ({
  block,
}: RichTextBlockComponentProps) => {
  const richText =
    typeof block.content === "string" ? block?.content : block?.content?.html;

  return <div dangerouslySetInnerHTML={{ __html: richText ?? "" }} />;
};
