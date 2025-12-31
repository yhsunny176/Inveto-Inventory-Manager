import Sidebar from "@/components/Sidebar";
// import { getCurrentUser } from "@/lib/auth";
import SignOutButton from "../dashboard/sign-out-button";
import Link from "next/link";
import { createProduct } from "@/lib/actions/products";

export default async function page() {
    // const session = await getCurrentUser();

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside>
                <Sidebar currentPath="/add-product" />
            </aside>

            <main className="flex-1 overflow-auto mx-20">
                <header>
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">Add Product</h1>
                                <p className="text-sm text-gray-500">Add a new product in inventory</p>
                            </div>
                            <SignOutButton />
                        </div>
                    </div>
                </header>

                <div className="max-w-2xl">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <form action={createProduct} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:border-transparent placeholder:text-gray-500"
                                    placeholder="Enter Product Name"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        min={"0"}
                                        required
                                        className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:border-transparent placeholder:text-gray-500"
                                        placeholder="0"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        step={"0.01"}
                                        min={"0"}
                                        required
                                        className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:border-transparent placeholder:text-gray-500"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                                    SKU (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="sku"
                                    name="sku"
                                    className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:border-transparent placeholder:text-gray-500"
                                    placeholder="Enter SKU"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">
                                    Low Stock At (Optional)
                                </label>
                                <input
                                    type="number"
                                    id="lowStockAt"
                                    name="lowStockAt"
                                    min={"0"}
                                    className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:border-transparent placeholder:text-gray-500"
                                    placeholder="Enter Low Stock Threshold"
                                />
                            </div>

                            <div className="flex gap-5">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer">
                                    Add Product
                                </button>
                                <Link
                                    href={""}
                                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
