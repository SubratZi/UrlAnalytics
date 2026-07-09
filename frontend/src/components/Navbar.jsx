import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Navbar() {
  const location = useLocation()
  const navigate= useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.success('Logged Out')
    navigate('/login')
  }

  return (
    <nav style={{
      background: 'white',
      borderBottom: '1px solid #f0f0f5',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: '32px', height: '32px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem'
        }}></div>
        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1a1d2e', letterSpacing: '-0.02em' }}>
          UrlAnalytics
        </span>
      </Link>
      
      <div style={{display:'flex', alignItems:'center', gap:'0.75rem'}}>
        <Link to="/create">
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>+</span> New Project
          </button>
        </Link>
        <button className='btn btn-secondary' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar