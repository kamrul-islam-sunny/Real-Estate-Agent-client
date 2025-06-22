import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
  } from "recharts";
  
  interface PropertiesChartProps {
    properties: any[];
  }
  
  export function PropertiesChart({ properties }: PropertiesChartProps) {
    // Count properties by type
    const data = properties.reduce((acc, property) => {
      const existing = acc.find((item:any) => item.name === property.type);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ name: property.type, count: 1 });
      }
      return acc;
    }, [] as {name: string, count: number}[]);
  
    return (
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="count" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} 
              name="Properties"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }