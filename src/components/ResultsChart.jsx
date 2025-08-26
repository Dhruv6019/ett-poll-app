import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const ResultsChart = ({ options }) => {
  // Prepare data for the chart
  const chartData = options.map((option) => ({
    name: option.title,
    votes: option.votes,
    percentage: options.reduce((total, opt) => total + opt.votes, 0) > 0 
      ? ((option.votes / options.reduce((total, opt) => total + opt.votes, 0)) * 100).toFixed(1)
      : "0",
    color: option.color,
    fullName: option.title,
    description: option.description
  }));

  const chartConfig = {
    votes: {
      label: "Votes",
    },
    react: {
      label: "React",
      color: "hsl(193, 95%, 68%)",
    },
    vue: {
      label: "Vue.js", 
      color: "hsl(153, 47%, 49%)",
    },
    angular: {
      label: "Angular",
      color: "hsl(348, 86%, 61%)",
    },
    svelte: {
      label: "Svelte",
      color: "hsl(15, 100%, 50%)",
    },
  };

  // Custom tooltip content
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <div className="font-semibold text-card-foreground mb-1">
            {data.fullName}
          </div>
          <div className="text-sm text-muted-foreground mb-2">
            {data.description}
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <span className="font-medium text-card-foreground">
              {data.votes} votes ({data.percentage}%)
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Bar Chart */}
      <div className="h-[300px] w-full">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              barCategoryGap="20%"
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <ChartTooltip content={<CustomTooltip />} />
              <Bar
                dataKey="votes"
                radius={[4, 4, 0, 0]}
                className="transition-all duration-300"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Horizontal Progress Bars */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground mb-3">Vote Distribution</h4>
        {options
          .sort((a, b) => b.votes - a.votes)
          .map((option) => {
            const total = options.reduce((sum, opt) => sum + opt.votes, 0);
            const percentage = total > 0 ? (option.votes / total) * 100 : 0;
            
            return (
              <div key={option.id} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-foreground">
                    {option.title}
                  </span>
                  <span className="text-muted-foreground">
                    {option.votes} votes ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: option.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ResultsChart;