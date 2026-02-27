import { notFound } from "next/navigation";
import { gqlFetch } from "@/lib/graphql";
import { Article } from "@/components/Article/Article";
import type { ReadonlyArticle } from "@/components/Article/types";

const GET_ARTICLE = /* GraphQL */ `
  query GetArticle($slug: String!) {
    getArticle(where: { values: { slug: $slug } }) {
      data {
        id
        values {
          title
          description
          slug
          content {
            ... on Article_Content_Hero {
              title
              subtitle
              description
              image
              callToActionButtonLabel
              callToActionButtonUrl
              __typename
            }
            ... on Article_Content_ThreeGridBox {
              boxes {
                title
                description
                icon
                __typename
              }
              __typename
            }
            ... on Article_Content_Banner {
              title
              actionLabel
              actionUrl
              image
              __typename
            }
            ... on Article_Content_Richtextfield {
              content
              __typename
            }
          }
        }
      }
    }
  }
`;

interface GetArticleData {
  getArticle: {
    data: ReadonlyArticle | null;
  };
}

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const data = await gqlFetch<GetArticleData>(GET_ARTICLE, { slug });
  const article = data.getArticle.data;

  if (!article) {
    notFound();
  }

  return (
    <main className="py-12">
      <Article article={article} />
    </main>
  );
}
