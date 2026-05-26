import type React from 'react'
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis } from 'recharts'

interface GraphProps {
    data: number[]
}

const ServerGraph: React.FC<GraphProps> = ({ data }) => {

    const chartData = data.map((value, index) => ({
        name: index,
        value: value
    }))

    return (
        <ResponsiveContainer width='100%' height={60}>
            <LineChart data={chartData}>
                <Line
                    // type='monotone'
                    dataKey="value"
                    stroke='#E5FF9C'      
                    strokeWidth={2}
                    dot={false}      
                    isAnimationActive={false}
                />

                <XAxis hide dataKey='name' />
                <YAxis hide domain={['dataMin - 10', 'dataMax + 10']}/>
            </LineChart>
        </ResponsiveContainer>
    )
}

export default ServerGraph