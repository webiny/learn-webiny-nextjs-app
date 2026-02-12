import { sdk, CmsEntryData } from "@/lib/webiny";
import type { Product } from "@/lib/types";

export default async function HomePage() {
  let products: CmsEntryData<Product>[] = [];
  let totalCount = 0;
  let error: string | null = null;

  try {
    const response = await sdk.cms.listEntries<Product>({
      modelId: "product",
      fields: [
        "id",
        "values.name",
        "values.description",
        "values.price",
        "values.sku",
        "values.category.id",
        "values.category.values.name",
        "values.category.values.slug",
      ],
    });

    products = response.data;
    totalCount = response.meta.totalCount;
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch products";
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Our Products</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
            <p className="font-semibold">Error loading products</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!error && products.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
            <p>
              No products found. Make sure you have published products in your
              Webiny CMS.
            </p>
          </div>
        )}

        {products.length > 0 && (
          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {product.values!.name}
                    </h2>
                    {product.values!.category && (
                      <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {product.values!.category!.values!.name}
                      </span>
                    )}
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.values!.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">
                  {product.values!.description}
                </p>
                <p className="text-sm text-gray-500">
                  SKU: {product.values!.sku}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Total products: {totalCount}</p>
        </div>
      </div>
    </main>
  );
}
