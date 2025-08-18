import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function ProductSaleChart({data}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorQuantity" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
            <stop offset="100%" stopColor="#ec4899" stopOpacity={1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
        <XAxis dataKey="date" stroke="currentColor" tick={{ fill: 'currentColor', opacity: 0.7, fontSize: 12 }} />
        <YAxis stroke="currentColor" tick={{ fill: 'currentColor', opacity: 0.7, fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="quantity" stroke="url(#colorQuantity)" strokeWidth={3} activeDot={{ r: 8 }} />
       </LineChart>
    </ResponsiveContainer>
  );
}
