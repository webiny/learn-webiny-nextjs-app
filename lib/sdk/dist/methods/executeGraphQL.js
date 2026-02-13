export async function executeGraphQL(config, fetchFn, query, variables = {}) {
  const url = `${config.endpoint}/graphql`;
  const response = await fetchFn(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.token}`,
      "x-tenant": config.tenant,
      "x-webiny-sdk": "v6",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0]?.message || "GraphQL error");
  }
  return result.data;
}

//# sourceMappingURL=executeGraphQL.js.map
