import React from "react";
import { ReadonlyArticle } from "./types";

import {
  BannerBlockComponent,
  HeroBlockComponent,
  isBannerBlock,
  isHeroBlock,
  isRichTextBlock,
  isTextWithImageBlock,
  isThreeGridBoxBlock,
  RichTextBlockComponent,
  TextWithImageBlockComponent,
  ThreeGridBoxBlockComponent,
} from "./Blocks";

interface ArticleProps {
  article: ReadonlyArticle;
}

export const Article = ({ article }: ArticleProps) => {
  return (
    <div className="mx-auto max-w-[1100px] px-[10px] flex flex-col antialiased">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          {article.values?.title ?? "Untitled"}
        </span>
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        {article.values?.description ?? ""}
      </p>

      {(article.values?.content || []).map((block, index) => {
        if (isRichTextBlock(block)) {
          return <RichTextBlockComponent key={index} block={block} />;
        }
        if (isTextWithImageBlock(block)) {
          return <TextWithImageBlockComponent key={index} block={block} />;
        }
        if (isBannerBlock(block)) {
          return <BannerBlockComponent key={index} block={block} />;
        }
        if (isHeroBlock(block)) {
          return <HeroBlockComponent key={index} block={block} />;
        }
        if (isThreeGridBoxBlock(block)) {
          return <ThreeGridBoxBlockComponent key={index} block={block} />;
        }
        return <pre key={index}>{JSON.stringify(block)}</pre>;
      })}
    </div>
  );
};
