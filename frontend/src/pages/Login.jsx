import { useState } from "react"
import {useNavigate, Link} from 'react-router-dom'
import {login} from '../api/client'
import toast from 'react-hot-toast'

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[loading, setLoading] = useState(false)

    const handleLogin = async() =>{
        if (!email || !password) return toast.error('Fill all fields first')
            setLoading(true)

        try{
            const res = await login ({username: email, password})
            localStorage.setItem('token', res.data.access_token)
            toast.success('You are Logged in!')
            navigate('/')
        }    catch(e){
            toast.error('Invalid email or password')
        } finally {
            setLoading(false)
        }

    }
    return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fc' }}>
      <div className='card' style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '48px', height: '48px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', margin: '0 auto 1rem'
          }}></div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1d2e' }}>Welcome back</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.3rem' }}>Sign in to your account</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '0.4rem' }}>Email</label>
            <input
              type='email'
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
              placeholder="*******"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '0.95rem' }}
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={handleLogin}
            disabled={loading}
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
            Dont have an account?{' '}
            <Link to="/register" style={{ color: '#6366f1', fontWeight: 600 }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login