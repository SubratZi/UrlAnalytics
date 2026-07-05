function VariationRow({ variation, isWinner, totalClicks }){
    return(
        <div className='card' styles ={{border: isWinner ? '2px solid #6366f1': '2px solid transparent'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                    <span style={{fontWeight:600, fontSize:'1rem'}}>{variation.label}</span>
                    {isWinner && (
                        <span style={{
                            marginLeft:'0.5rem',
                            background:'#6366f1',
                            color:'white',
                            borderRadius: '999px',
                            padding:'0.1rem 0.6rem',
                            fontSize:'0.75rem'
                        }}>
                            Winner
                        </span>
                    )}
                </div>
                <span style={{fontWeight: 700, fontSize:'1.2rem', color:'#6366f1'}}>
                    {variation.total_clicks} clicks
                </span>
            </div>
            <div style = {{marginTop:'0.8rem'}}>
                <div style= {{display:'flex', justifyContent:'space-between', fontSize:'0.85rem', color:'#6b7280', marginBottom:'0.3rem'}}>
                    <span>{variation.click_ratio}% of total clicks</span>
                    <span>{variation.target_url}</span>
                </div>
                <div style={{background:'#e5e7eb', borderRadius:'999px', height:'8px'}}>
                    <div style={{
                        background:'#6366f1',
                        width:`${variation.click_ratio}%`,
                        height:'8px',
                        borderRadius:'999px',
                        transition:'width 0.5s ease'
                    }} />
                </div>
            </div>
        </div>
    )
}

export default VariationRow