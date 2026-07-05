import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnalytics } from "../api/client";
import VariationRow from '../components/VariationRow'
import BreakdownChart from "../components/BreakdownChart";

function Analytics(){
    const {id} = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        getAnalytics(id)
        .then(res => setData(res.data))
        .finally(() => setLoading(false))
    },[id])

    if(loading) return <div className='container'>Loading...</div>
    if(!data) return <div className='container'>Project not found.</div>

    const selectedVariation = data.variations[selected]

    return (
        <div className="container">
            <button className="btn btn-secondary" onClick={()=> navigate('/')} style={{marginBottom:'1rem'}}>
                Back
            </button>
            <h1 style={{fontSize: '1.5rem', fontweight:700, marginnBottom:'0.5rem'}}>{data.name}</h1>
            <p style={{color:'#6b7280', marginBottom:'1.5rem'}}>
                Total Clicks: <strong>{data.total_clicks}</strong>
                {data.winner && (
                    <span style={{marginLeft:'1rem', color:'#6366f1', fontWeight:600}}>
                        Winner: {data.winner}
                    </span>
                )}
                {!data.winner && data.total_clicks > 0 && (
                    <span style={{marginLeft:'1rem', color:'#f59e0b', fontWeight:600}}>
                        Tie
                    </span>
                )}
            </p>
            <h2 style={{fontWeight:600, marginBottom: '0.8rem'}}>Variations</h2>
            {data.variations.map((v,i) =>(
                <VariationRow
                    key={v.id}
                    variation={v}
                    isWinner={data.winner ===v.label}
                    totalClicks={data.total_clicks}
                />
            ))}

            <h2 style={{fontWeight:600, margin:'1.5rem 0 0.8rem'}}>Breakdown by Variation</h2>
            <div style={{display:'flex', gap:'0.5rem', marginBottom:'1rem'}}>
                {data.variations.map((v,i) =>(
                    <button
                        key={v.id}
                        className={`btn ${selected === i? 'btn-primary': 'btn-secondary'}`}
                        onClick={()=> setSelected(i)}
                        >
                            {v.label}
                        </button>
                ))}
            </div>
            <div className='breakdown-grid' style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap:'1rem'}}>
                <BreakdownChart title='Device' data={selectedVariation.device_breakdown}/>
                <BreakdownChart title='Country' data={selectedVariation.country_breakdown}/>
                <BreakdownChart title='Referrer' data={selectedVariation.referrer_breakdown} />
            </div>
        </div>
    )
}

export default Analytics