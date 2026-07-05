import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProject } from '../api/client'

const getLabel = (index) => `Variation ${String.fromCharCode(65 + index)}`

function CreateProject() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [variations, setVariations] = useState([
    { label: 'Variation A', target_url: '' },
    { label: 'Variation B', target_url: '' },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const addVariation = () => {
    setVariations(prev => {
      const usedLabels = prev.map(v => v.label)
      let index = 0
      while (usedLabels.includes(getLabel(index))) index++
      return [...prev, { label: getLabel(index), target_url: '' }]
    })
  }

  const removeVariation = (index) => {
    if (variations.length <= 2) return
    setVariations(prev => prev.filter((_, i) => i !== index))
  }

  const updateVariation = (index, field, value) => {
    setVariations(prev => prev.map((v, i) => i === index ? { ...v, [field]: value } : v))
  }

  const handleSubmit = async () => {
    if (!name.trim()) return setError('Project name is required')
    if (variations.some(v => !v.target_url.trim())) return setError('All urls are required')
    if (variations.some(v => !v.label.trim())) return setError('All variations names are required')

    setLoading(true)
    setError('')
    try {
      await createProject({ name, variations })
      navigate('/')
    } catch (e) {
      setError('Failed to create project.Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container' style={{ maxWidth: '700px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>New Test</h1>

      <div className='card'>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Project Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='e.g. Grocery Project'
          style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.95rem' }}
        />
      </div>

      <h2 style={{ fontWeight: 600, margin: '1rem 0 0.5rem' }}>Variations</h2>

      {variations.map((v, i) => (
        <div className='card' key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
              <input
                value={v.label}
                onChange={e => updateVariation(i, 'label', e.target.value)}
                placeholder='Variation name'
                style={{
                  fontWeight: 600,
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  padding: '0.4rem 0.6rem',
                  width: '60%',
                  outline: 'none',
                }}
              />
            </div>
            {variations.length > 2 && (
              <button className='btn btn-danger' onClick={() => removeVariation(i)} style={{ fontSize: '0.8rem' }}>
                Remove
              </button>
            )}
          </div>
          <input
            value={v.target_url}
            onChange={e => updateVariation(i, 'target_url', e.target.value)}
            placeholder='https://yoursite.com/page'
            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.95rem' }}
          />
        </div>
      ))}

      <button className='btn btn-secondary' onClick={addVariation} style={{ marginBottom: '1rem' }}>
        + Add Variation
      </button>

      {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}

      <button className='btn btn-primary' onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '0.8rem' }}>
        {loading ? 'Creating...' : 'Create Project'}
      </button>
    </div>
  )
}

export default CreateProject