import { BarChart, Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import colors from "tailwindcss/colors";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
];
const data = [
  { product: "Peperoni", amount: 100 },
  { product: "Marguerita", amount: 200 },
  { product: "Calabresa", amount: 300 },
  { product: "Frango", amount: 400 },
];

export function PopularProductsChart() {
  return (
    <Card className="col-span-3 border border-red-500 shadow-xl">
      <CardHeader className="pb-8">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            Produtos populares
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardDescription>Os 5 produtos com mais vendas</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: 14 }}>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={86}
              innerRadius={64}
              strokeWidth={8}
              fill={colors.emerald["500"]}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = 12 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {data[index].product.substring(0, 12).concat("...")} (
                    {value})
                  </text>
                );
              }}
            >
              {data.map((_, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-background"
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
