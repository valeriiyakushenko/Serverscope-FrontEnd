import type React from "react";
import { useMemo } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

interface ChartPoint {
    time: string;
    [key: string]: any;
}

interface ServerChartProps {
    data: ChartPoint[];
    dataKey: string;
    lineColor?: string;
    timeRange: "24h" | "3d" | "7d" | "30d";
}

export const ServerChart: React.FC<ServerChartProps> = ({
    data,
    dataKey,
    lineColor = "#E5FF9C",
    timeRange,
}) => {
    const formattedData = useMemo(() => {
        if (!data) return [];
        
        return data.map((point) => {
            const date = new Date(point.time);
            let formattedTime = "";

            if (timeRange === "24h") {
                formattedTime = `${date.getHours()}h`;
            } else {
                formattedTime = date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
            }

            let value = point[dataKey];

            if (dataKey === "uptimeRatio" && value !== undefined && value !== null) {
                value = Math.round(value * 100);
            }

            return {
                ...point,
                displayTime: formattedTime,
                [dataKey]: value,
            };
        });
    }, [data, dataKey, timeRange]);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: "rgba(0, 0, 0, 0.85)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    backdropFilter: "blur(4px)"
                }}>
                    <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, fontSize: "12px" }}>
                        {payload[0].payload.displayTime}
                    </p>
                    <p style={{ color: lineColor, margin: "2px 0 0 0", fontWeight: 600, fontSize: "14px" }}>
                        {dataKey === "uptimeRatio" ? "Uptime" : dataKey === "rank" ? "Rank" : "Players"}: 
                        {dataKey === "uptimeRatio" ? `${payload[0].value}%` : dataKey === "rank" ? `#${payload[0].value}` : payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={formattedData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id={`colorUv-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={lineColor} stopOpacity={0.2} />
                            <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="rgba(255, 255, 255, 0.03)" 
                        vertical={false} 
                    />

                    <XAxis
                        dataKey="displayTime"
                        stroke="rgba(255, 255, 255, 0.3)"
                        fontSize={11}
                        tickLine={false}
                        dy={10}
                        interval={timeRange === "24h" ? 12 : "preserveEnd"}
                    />

                    <YAxis
                        stroke="rgba(255, 255, 255, 0.4)"
                        fontSize={11}
                        tickLine={false}
                        dx={-5}
                        domain={dataKey === "uptimeRatio" ? [0, 100] : dataKey === "rank" ? [1, 'auto'] : [0, 'auto']}
                        reversed={dataKey === "rank"}
                        tickFormatter={(tick) => dataKey === "uptimeRatio" ? `${tick}%` : tick}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Area
                        type="monotone"
                        dataKey={dataKey}
                        stroke={lineColor}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill={`url(#colorUv-${dataKey})`}
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0, fill: lineColor }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};