"use client";

import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Area, Tooltip } from "recharts";

interface ChartData {
    week: string;
    products: number;
}
export default function ProductsChart({ data }: { data: ChartData[] }) {
    return (
        <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#CCCBCA" />
                    <XAxis dataKey={"week"} stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Area
                        type="monotone"
                        dataKey="products"
                        stroke="#61CFA3"
                        fill="#61CFA3"
                        fillOpacity={0.3}
                        strokeWidth={2}
                        dot={{ fill: "#61CFA3", strokeWidth: 2, r: 4 }}
                        activeDot={{ fill: "#61CFA3", strokeWidth: 2, r: 6 }}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e57eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                        labelStyle={{ color: "#374151", fontWeight: "500" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
