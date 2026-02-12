/**
 * Entry values type.
 */

/**
 * Entry status type.
 */

/**
 * CMS identity.
 */

/**
 * CMS entry data returned from queries.
 */

/**
 * Lists entries from the CMS with filtering, sorting, and pagination support.
 *
 * @template TValues - Type of the entry data objects. Users should specify this to include all fields they're requesting (id, entryId, values, createdOn, etc.)
 * @param config - SDK configuration
 * @param fetchFn - Fetch function to use for HTTP requests
 * @param params - Parameters for listing entries
 * @param params.modelId - The model ID of entries to list
 * @param params.where - Optional where conditions to filter entries
 * @param params.sort - Optional sort configuration
 * @param params.limit - Maximum number of entries to return (default: 10)
 * @param params.after - Cursor for pagination
 * @param params.fields - Specific fields to return. Use "values." prefix for entry values (e.g., "values.author.name") or specify top-level fields like "createdOn"
 * @param params.preview - When true, uses preview API to access unpublished/draft content. When false (default), uses read API for published content only.
 * @returns List of entries with pagination metadata
 */
export async function listEntries(config, fetchFn, params) {
  const { modelId, where, sort, limit = 10, after, fields, preview } = params;
  const { executeGraphQL } = await import("./executeGraphQL.js");
  const query = `
        query ListEntries(
            $modelId: ID!
            $where: JSON
            $sort: JSON
            $limit: Int
            $after: String
            $fields: [String!]!
            $preview: Boolean
        ) {
            cms {
                listEntries(
                    modelId: $modelId
                    where: $where
                    sort: $sort
                    limit: $limit
                    after: $after
                    fields: $fields
                    preview: $preview
                ) {
                    data
                    meta {
                        cursor
                        hasMoreItems
                        totalCount
                    }
                    error {
                        message
                        code
                    }
                }
            }
        }
    `;
  const data = await executeGraphQL(config, fetchFn, query, {
    modelId,
    where,
    sort,
    limit,
    after,
    fields,
    preview,
  });
  if (data.cms.listEntries.error) {
    throw new Error(data.cms.listEntries.error.message);
  }
  return {
    data: data.cms.listEntries.data,
    meta: data.cms.listEntries.meta,
  };
}

//# sourceMappingURL=listEntries.js.map
