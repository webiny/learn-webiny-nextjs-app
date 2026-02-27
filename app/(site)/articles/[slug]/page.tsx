import { notFound } from "next/navigation";
import { sdk } from "@/lib/webiny";
import { Article as ArticleValues } from "@/components/Article/types";
import { Article } from "@/components/Article/Article";

const ARTICLE_FIELDS = [
  "id",
  "values.title",
  "values.description",
  "values.slug",
  "values.content",
];

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const result = await sdk.cms.getEntry<ArticleValues>({
    modelId: "article",
    where: { values: { slug } },
    fields: ARTICLE_FIELDS,
  });

  if (!result.isOk()) {
    throw new Error(`Failed to fetch article: ${result.error}`);
  }

  const article = result.value;

  if (!article) {
    notFound();
  }

  return (
    <main className="py-12">
      <Article article={article} />
    </main>
  );
}
