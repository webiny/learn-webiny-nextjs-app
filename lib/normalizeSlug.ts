import { trailingSlash } from "./constants";
import { SlugNormalizer, type SlugInput } from "./SlugNormalizer";

const normalizer = new SlugNormalizer({ trailingSlash });

export const normalizeSlug = (slug: SlugInput) => {
    return normalizer.normalize(slug);
};
