import { sdk } from "@/lib/webiny";
import type { Product } from "@/lib/types";
import type { CmsEntryData } from "@webiny/sdk";

export default async function HomePage() {
  const result = await sdk.cms.listEntries<Product>({
    modelId: "product",
    fields: ["id", "entryId", "values.name", "values.description", "values.price", "values.sku"],
    sort: { values_name: "asc" }
  });

  if (!result.isOk()) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-red-600">Failed to load products: {result.error.message}</p>
      </main>
    );
  }

  const products: CmsEntryData<Product>[] = result.value.data;

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found. Add some in Webiny Admin!</p>
      ) : (
        <ul className="space-y-4">
          {products.map(product => (
            <li key={product.id} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold">{product.values?.name}</h2>
              <p className="text-gray-600 mt-1">{product.values?.description}</p>
              <p className="text-lg font-bold mt-2">${product.values?.price.toFixed(2)}</p>
              <p className="text-sm text-gray-400">SKU: {product.values?.sku}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
