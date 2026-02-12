export async function deleteEntryRevision(config, fetchFn, params) {
  const { modelId, revisionId, permanent = false } = params;
  const { executeGraphQL } = await import("./executeGraphQL.js");
  const query = `
        mutation DeleteEntryRevision($modelId: ID!, $revisionId: ID!, $permanent: Boolean) {
            cms {
                deleteEntryRevision(modelId: $modelId, revisionId: $revisionId, permanent: $permanent) {
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
    permanent,
  });
  if (data.cms.deleteEntryRevision.error) {
    throw new Error(data.cms.deleteEntryRevision.error.message);
  }
  return data.cms.deleteEntryRevision.data;
}

//# sourceMappingURL=deleteEntryRevision.js.map
