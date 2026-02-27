import { gqlFetch } from "@/lib/graphql";
import type { Product, ProductCategory } from "@/lib/types";

const LIST_PRODUCTS = /* GraphQL */ `
  query ListProducts {
    listProducts {
      data {
        id
        name
        description
        price
        sku
        category {
          id
          name
          slug
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

interface ProductEntry {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  category?: ProductCategory & { id: string };
}

interface ListProductsData {
  listProducts: {
    data: ProductEntry[];
    meta: { totalCount: number };
  };
}

export default async function HomePage() {
  let products: ProductEntry[] = [];
  let totalCount = 0;
  let error: string | null = null;

  try {
    const data = await gqlFetch<ListProductsData>(LIST_PRODUCTS);
    products = data.listProducts.data;
    totalCount = data.listProducts.meta.totalCount;
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
                    <h2 className="text-2xl font-semibold">{product.name}</h2>
                    {product.category && (
                      <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {product.category.name}
                      </span>
                    )}
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{product.description}</p>
                <p className="text-sm text-gray-500">SKU: {product.sku}</p>
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
