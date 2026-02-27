export interface GenericBlock {
  __typename: string;
  _templateId: string;
}

export interface HeroBlock extends GenericBlock {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  callToActionButtonLabel: string;
  callToActionButtonUrl: string;
}

export interface BannerBlock extends GenericBlock {
  title: string;
  actionUrl: string;
  actionLabel: string;
  image: string;
}

export interface RichTextBlock extends GenericBlock {
  content: { html: string; state: string } | string;
}

export interface ThreeGridBoxBlock extends GenericBlock {
  boxes: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export interface ReadonlyArticle {
  id: string;
  values: {
    title: string;
    description: string;
    slug: string;
    content: Array<GenericBlock>;
  };
}
