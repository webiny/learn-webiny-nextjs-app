const ENDPOINT = process.env.WEBINY_API_ENDPOINT;
const TOKEN = process.env.WEBINY_API_TOKEN;

interface GraphQLResponse<T> {
	data: T;
	errors?: Array<{ message: string }>;
}

interface GqlFetchParams {
	query: string;
	variables?: Record<string, any>;
	preview?: boolean;
}

export async function gqlFetch<T>(params: GqlFetchParams): Promise<T> {
	const { query, variables, preview = false } = params;
	const endpoint = preview ? `${ENDPOINT}/cms/preview` : `${ENDPOINT}/cms/read`;

	const res = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${TOKEN}`
		},
		body: JSON.stringify({ query, variables })
	});

	if (!res.ok) {
		throw new Error(`HTTP ${res.status}: ${res.statusText}`);
	}

	const json: GraphQLResponse<T> = await res.json();

	if (json.errors?.length) {
		throw new Error(json.errors.map(e => e.message).join(", "));
	}

	return json.data;
}
