import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"; // Import the ResponsiveContainer component
import colors from 'tailwindcss/colors';




const data = [
  { data: "2021-01-01", value: 4000 },
  { data: "2021-01-02", value: 3000 },
  { data: "2021-01-03", value: 2000 },
  { data: "2021-01-04", value: 2780 },
  { data: "2021-01-05", value: 1890 },
  { data: "2021-01-06", value: 2390 },
  { data: "2021-01-07", value: 3490 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-6 border border-gray-400 shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no periodo
          </CardTitle>
          <CardDescription>Receita Diaria no periodo</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} style={{ fontSize: 16 }}>
            <XAxis dataKey="data" stroke="#888" axisLine={false} dy={16} />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={90}
              tickFormatter={(value) =>
                value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }
            />
            <Line type={"linear"} stroke={colors.red['500']} strokeWidth={2} dataKey='value' />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
