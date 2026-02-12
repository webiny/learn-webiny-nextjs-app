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
 * Publishes an entry revision in the CMS.
 *
 * @template TValues - Type of the entry values object
 * @param config - SDK configuration
 * @param fetchFn - Fetch function to use for HTTP requests
 * @param params - Parameters for publishing the entry revision
 * @param params.modelId - The model ID of the entry to publish
 * @param params.revisionId - The revision ID of the entry to publish (e.g., "123#0001")
 * @param params.fields - Fields to include in response. Use "values." prefix for entry values (e.g., "values.author.name")
 * @returns The published entry data
 */
export async function publishEntryRevision(config, fetchFn, params) {
  const { modelId, revisionId, fields } = params;
  const { executeGraphQL } = await import("./executeGraphQL.js");
  const query = `
        mutation PublishEntryRevision($modelId: ID!, $revisionId: ID!, $fields: [String!]!) {
            cms {
                publishEntryRevision(modelId: $modelId, revisionId: $revisionId, fields: $fields) {
                    data
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
    revisionId,
    fields,
  });
  if (data.cms.publishEntryRevision.error) {
    throw new Error(data.cms.publishEntryRevision.error.message);
  }
  return data.cms.publishEntryRevision.data;
}

//# sourceMappingURL=publishEntryRevision.js.map
