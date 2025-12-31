import Pagination from "@/components/Pagination";
import Sidebar from "@/components/Sidebar";
import { deleteProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function page({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
    const session = await getCurrentUser();
    const userId = session.data?.user.id;
    const params = await searchParams;
    const q = (params.q ?? "").trim();

    const where = {
        userId,
        ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
    };

    const pageSize = 10;

    const page = Math.max(1, Number(params.page ?? 1));
    const [totalCount, products] = await Promise.all([
        prisma.product.count({ where }),
        prisma.product.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside>
                <Sidebar currentPath="/inventory" />
            </aside>

            <main className="flex-1 overflow-auto p-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
                            <p className="text-sm text-gray-500">Manage your products and track inventory levels.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Search */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <form action="/inventory" className="flex gap-2" method="GET">
                            <input
                                name="q"
                                placeholder="Search Products.."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent text-gray-900"
                                type="text"
                            />
                            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                                Search
                            </button>
                        </form>
                    </div>

                    {/* Products Table */}

                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        SKU
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Quantity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Low Stock
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product, key) => (
                                    <tr key={key} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-600">{product.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{product.sku || "-"}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                            ${Number(product.price).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{product.quantity}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{product.lowStockAt || "-"}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <form action={deleteProduct}>
                                                <input type="hidden" name="id" value={product.id} />
                                                <button className="text-red-600 hover:bg-red-500 hover:text-white cursor-pointer transition duration-600 ease-in-out bg-red-200 px-2 py-1 rounded-sm">
                                                    Delete
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                baseUrl="/inventory"
                                searchParams={{ q, pageSize: String(pageSize) }}
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
