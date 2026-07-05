import { useNavigate } from 'react-router-dom'
import { deleteProject } from '../api/client'
import toast from 'react-hot-toast'

function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (confirm('Delete this project?')) {
      await deleteProject(project.id)
      onDelete(project.id)
      toast.success('Project deleted')
    }
  }

  const copyToClipboard = (shortCode) => {
    navigator.clipboard.writeText(`${window.location.origin}/r/${shortCode}`)
    toast.success('Copied to clipboard!')
  }

  const totalClicks = project.variations.reduce((s, v) => s + v.click_count, 0)

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a1d2e' }}>{project.name}</h2>
          <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.2rem' }}>
            {project.variations.length} variations  {totalClicks} total clicks
          </p>
        </div>
        <div className='card-actions' style={{ display: 'flex', gap: '0.4rem' }}>
          <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }}
            onClick={() => navigate(`/edit/${project.id}`)}>
            Edit
          </button>
          <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }}
            onClick={() => navigate(`/analytics/${project.id}`)}>
            Analytics
          </button>
          <button className="btn btn-danger" style={{ fontSize: '0.8rem' }} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {project.variations.map(v => (
          <div key={v.id} className="variation-pill">
            <span style={{ fontWeight: 600, fontSize: '0.875rem', minWidth: '100px' }}>{v.label}</span>
            <span style={{ fontSize: '0.78rem', color: '#9ca3af', flex: 1, margin: '0 1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              /r/{v.short_code}
            </span>
            <span style={{ fontWeight: 700, color: '#6366f1', fontSize: '0.875rem', marginRight: '0.75rem' }}>
              {v.click_count} clicks
            </span>
            <button
              className="btn btn-secondary"
              onClick={() => copyToClipboard(v.short_code)}
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectCard