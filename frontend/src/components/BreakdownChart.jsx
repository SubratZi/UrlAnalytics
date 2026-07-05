import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell} from 'recharts'
const COLORS =['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']

function BreakdownChart({title, data}){
    const chartdata = Object.entries(data).map (([name, value]) => ({name, value}))

    if (chartdata.length ===0){
        return(
            <div className='card'>
                <h3 style={{marginBottom: '1rem',fontWeight:600}}>{title}</h3>
                <p style={{color: '#6b7280', fontSize:'0.9rem'}}>No data yet</p>
            </div>
        )
    }
    return(
        <div className='card'>
            <h3 style={{marginBottom:'1rem', fontWeight:600}}>{title}</h3>
            <ResponsiveContainer width='100%' height={200}>
                <BarChart data={chartdata}>
                    <XAxis dataKey='name' tick={{fontSize:12}}/>
                    <YAxis allowDecimals={false} tick={{fontSize:12}}/>
                    <Tooltip/>
                    <Bar dataKey='value' radius={[6,6,0,0]}>
                        {chartdata.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default BreakdownChart