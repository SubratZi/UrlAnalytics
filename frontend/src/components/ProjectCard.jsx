import { Link, useNavigate } from 'react-router-dom'
import {deleteProject} from '../api/client'

function ProjectCard({ project, onDelete }) {
    const navigate = useNavigate()


const handleDelte = async () => {
    if (confirm('Delete this project?')){
        await deleteProject(project.id)
        onDelete(project.id)
    }
    }

    return(
        <div className='card'>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h2 style = {{fontSize: '1.1rem', fontWeight:'0.600'}}>{project.name}</h2>
                <div style={{display:'flex', gap:'0.5rem'}}>
                    <button
                    className='btn btn-secondary'
                    onClick={() => navigate(`/analytics/${project.id}`)}>
                        Analytics
                    </button>
                    <button className='btn btn-danger' onClick={handleDelte}>
                        Delete
                    </button>
                </div>
            </div>

            <div style= {{ mrginTop:'1rem', display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                {project.variations.map(v => (
                    <div key={v.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'#f9fafb', padding:'0.6rem 1rem', borderRadius:'8px'}}>
                        <span style={{fontWeight: 500}}>{v.label}</span>
                        <span style={{fontSize: '0.85rem', color:'#6b7280'}}>
                            {window.location.origin}/r/{v.short_code}
                        </span>
                        <span style={{fontWeight: 600, color:'#6366f1' }}>{v.click_count}clicks</span>
                    </div>
                ))}
            </div>
        </div> 
    )
}
export default ProjectCard