import { redirect } from "next/navigation";
import SignOutButton from "./sign-out-button";
import Sidebar from "@/components/Sidebar";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { TrendingUp } from "lucide-react";
import ProductsChart from "@/components/ProductsChart";

export default async function DashboardPage() {
    const session = await getCurrentUser();
    const userId = session.data?.user.id;

    if (!session) {
        redirect("/auth/sign-in");
    }

    const [totalProducts, lowStock, allProducts] = await Promise.all([
        prisma.product.count({ where: { userId } }),
        prisma.product.count({
            where: {
                userId,
                lowStockAt: { not: null },
                quantity: { lte: 5 },
            },
        }),
        prisma.product.findMany({
            where: { userId },
            select: { price: true, quantity: true, createdAt: true },
        }),
    ]);

    const recent = await prisma.product.findMany({
        where: { userId },
        take: 5,
        orderBy: { createdAt: "desc" },
    });

    const totalValue = allProducts.reduce((sum, product) => sum + Number(product.price) * Number(product.quantity), 0);

    const inStockCount = allProducts.filter((p) => Number(p.quantity) > 5).length;
    const lowStockCount = allProducts.filter((p) => Number(p.quantity) <= 5 && Number(p.quantity) >= 1).length;
    const outOfStockCount = allProducts.filter((p) => Number(p.quantity) === 0).length;

    const inStockPercentage = totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0;
    const lowStockPercentage = totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0;
    const outOfStockPercentage = totalProducts > 0 ? Math.round((outOfStockCount / totalProducts) * 100) : 0;

    const now = new Date();
    const weeklyProductsData = [];

    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - i * 7);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekStart.setHours(23, 59, 59, 999);

        const weekLabel = `${String(weekStart.getMonth() + 1).padStart(2, "0")}/${String(weekStart.getDate() + 1).padStart(2, "0")}`;

        const weeklyProducts = allProducts.filter((product) => {
            const productDate = new Date(product.createdAt);
            return productDate >= weekStart && productDate <= weekEnd;
        });

        weeklyProductsData.push({
            week: weekLabel,
            products: weeklyProducts.length,
        });
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside>
                <Sidebar currentPath="/dashboard" />
            </aside>

            <main className="flex-1 overflow-auto">
                <header>
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                                <p className="text-sm text-gray-500">Welcome Back!</p>
                            </div>
                            <SignOutButton />
                        </div>
                    </div>
                </header>

                {/* Metrics to Show */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-11/12 mx-auto mb-8">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Statistics of Inventory</h2>
                        <div className="grid grid-cols-3 gap-6">
                            {/* Total Products */}
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">{totalProducts}</div>
                                <div className="text-sm text-gray-600">Total Products</div>
                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-green-600">+{totalProducts}</span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                                </div>
                            </div>

                            {/* Total Value */}
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">${Number(totalValue).toFixed(0)}</div>
                                <div className="text-sm text-gray-600">Total Value</div>
                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-green-600">+${Number(totalValue).toFixed(0)}</span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                                </div>
                            </div>

                            {/* Low Stock */}
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">{lowStock}</div>
                                <div className="text-sm text-gray-600">Low Stock</div>
                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-green-600">+{lowStock}</span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory over the Time (Products added per week) */}

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-betweeen mb-6">
                            <h2>New Products Per Week</h2>
                        </div>
                        <div className="h-48">
                            <ProductsChart data={weeklyProductsData} />
                        </div>
                    </div>
                </div>

                {/* Stock Levels Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-11/12 mx-auto">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Stock Levels</h2>
                        </div>
                        <div className="space-y-3">
                            {recent.map((product, key) => {
                                const stockLevel =
                                    product.quantity === 0 ? 0 : product.quantity <= (product.lowStockAt ?? 5) ? 1 : 2;
                                const bgColors = ["bg-red-600", "bg-yellow-600", "bg-green-600"];
                                const textColors = ["text-red-600", "text-yellow-600", "text-green-600"];

                                return (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`}></div>
                                            <span className="text-gray-600 text-sm font-medium gray-900">
                                                {product.name}
                                            </span>
                                        </div>
                                        <div className={`text-sm font-medium ${textColors[stockLevel]}`}>
                                            {product.quantity} units
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Efficiency Section */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Efficiency</h2>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="relative w-48 h-48">
                                <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                                <div
                                    className="absolute inset-0 rounded-full border-8 border-purple-600"
                                    style={{
                                        clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">{inStockPercentage}%</div>
                                        <div className="text-sm text-gray-600">In Stock</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-purple-400" />
                                    <span>In Stock {inStockPercentage}%</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <span>Low Stock {lowStockPercentage}%</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-600" />
                                    <span>Out of Stock {outOfStockPercentage}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
