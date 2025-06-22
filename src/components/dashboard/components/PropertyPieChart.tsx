import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
  } from "recharts";
 
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  interface PropertyPieChartProps {
    properties: any[];
  }
  
  export function PropertyPieChart({ properties }: PropertyPieChartProps) {
    // Count properties by type with proper typing
    const data: any[] = properties.reduce((acc: any[], property) => {
      const existing = acc.find(item => item.name === property.type);
      if (existing) {
        existing.value += 1;
      } else {
        acc.push({ name: property.type, value: 1 });
      }
      return acc;
    }, []);
  
    // Sort by count descending
    data.sort((a, b) => b.value - a.value);
  
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => 
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number, name: string, props: any) => [
              value, 
              `${props.payload.name}: ${((props.payload.percent || 0) * 100).toFixed(1)}%`
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }