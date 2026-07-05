function VariationRow({ variation, isWinner }) {
  return (
    <div className="card" style={{
      border: isWinner ? '2px solid #6366f1' : '2px solid transparent',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {isWinner && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white', fontSize: '0.7rem', fontWeight: 700,
          padding: '0.3rem 0.8rem',
          borderBottomLeftRadius: '10px',
          letterSpacing: '0.05em',
        }}>
          Winner
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <span style={{ fontWeight: 700, fontSize: '1rem' }}>{variation.label}</span>
        <span style={{ fontWeight: 800, fontSize: '1.3rem', color: '#6366f1' }}>
          {variation.total_clicks}
          <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#9ca3af', marginLeft: '0.3rem' }}>clicks</span>
        </span>
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.4rem' }}>
          <span>{variation.click_ratio}% of total</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
            {variation.target_url}
          </span>
        </div>
        <div style={{ background: '#f0f0f8', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
          <div style={{
            background: isWinner
              ? 'linear-gradient(90deg, #6366f1, #8b5cf6)'
              : 'linear-gradient(90deg, #a5b4fc, #c4b5fd)',
            width: `${variation.click_ratio}%`,
            height: '6px',
            borderRadius: '999px',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }} />
        </div>
      </div>
    </div>
  )
}

export default VariationRow