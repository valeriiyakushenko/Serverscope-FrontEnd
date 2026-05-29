import type React from 'react'
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis } from 'recharts'

interface GraphProps {
    data: number[]
}

const ServerGraph: React.FC<GraphProps> = ({ data }) => {
    const rawData = data && data.length ? [...data] : [];

    if (rawData.length > 2) {
        if (rawData[0] < rawData[1] * 0.7) {
            rawData[0] = rawData[1];
        }
        const lastIdx = rawData.length - 1;
        if (rawData[lastIdx] < rawData[lastIdx - 1] * 0.7) {
            rawData[lastIdx] = rawData[lastIdx - 1];
        }
    }

    const chartData = rawData.map((value, index) => ({
        name: index,
        value: value
    }));

    if (chartData.length === 0) {
        return <div style={{ color: '#444', fontSize: '12px', textAlign: 'center' }}>No data</div>;
    }

    return (
        <ResponsiveContainer width='100%' height={60}>
            <LineChart data={chartData} margin={{ top: 5, bottom: 5, left: 5, right: 5 }}>
                <Line
                    dataKey="value"
                    stroke='#E5FF9C'      
                    strokeWidth={2}
                    dot={false}      
                    isAnimationActive={false}
                />
                {/* <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} /> */}

                <YAxis hide domain={[0, 'dataMax + 10']} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default ServerGraph