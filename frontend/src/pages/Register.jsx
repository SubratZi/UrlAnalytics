import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {register} from '../api/client'
import toast from "react-hot-toast"

function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loading, setLoadin] = useState(false)

    const handleRegister = async () => {
        if(!email || !password || !confirm) return toast.error('Fill all the fields first')
        if(password !== confirm ) return toast.error('Passwords dont match')
        if(password.length < 8) return toast.error('Password must be of at least 8 characters')
        
        setLoading(true)
        try{
            const res = await register({email, password})
            localStorage.setItem('token', res.data.access_token)
            toast.success('Account created!')
            navigate('/')
        }catch(e){
            toast.error(e.response?.data?.detail || 'Registration failed')
        }finally{
            setLoading(false)
        }
    }
    return(
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fc' }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '48px', height: '48px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', margin: '0 auto 1rem'
          }}></div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1d2e' }}>Create account</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.3rem' }}>Start analysing your links today</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '0.4rem' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="hackclub@example.com"
              style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '0.95rem' }}
            />
          </div>

          <div>
            <label style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '0.4rem' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="******"
              style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '0.95rem' }}
            />
          </div>

          <div>
            <label style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '0.4rem' }}>Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="******"
              onKeyDown={e => e.key === 'Enter' && handleRegister()}
              style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '0.95rem' }}
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={handleRegister}
            disabled={loading}
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
            Already a user?{' '}
            <Link to="/login" style={{ color: '#6366f1', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register