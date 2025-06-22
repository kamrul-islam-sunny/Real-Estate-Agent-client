import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
  } from "recharts";

  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  interface ContactPieChartProps {
    contacts: any[];
  }
  
  export function ContactPieChart({ contacts }: ContactPieChartProps) {
    // Prepare data for the pie chart
    const data: any[] = [
      {
        name: 'Read',
        value: contacts.filter(contact => contact.isRead).length,
      },
      {
        name: 'Unread',
        value: contacts.filter(contact => !contact.isRead).length,
      },
      {
        name: 'Important',
        value: contacts.filter(contact => contact.isImportant).length,
      },
      {
        name: 'Regular',
        value: contacts.filter(contact => !contact.isImportant).length,
      },
    ];
  
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