import { useState, useEffect} from "react";
import {getProjects} from '../api/client'
import ProjectCard from "../components/ProjectCard";
import Skeleton from "../components/Skeleton";

function Home(){
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        getProjects()
        .then(res => setProjects(res.data))
        .finally(() => setLoading(false))
    }, [])

    const handleDelete = (id) => {
        setProjects(prev => prev.filter(p => p.id !==id))
    }

    const totalClicks = projects.reduce((sum,p) =>
    sum + p.variations.reduce((s,v) => s +v.click_count, 0),0)

    const totalVariations = projects.reduce((sum, p) => sum+p.variations.length,0)

    if(loading) return (
        <div className="container">
            {[1,2,3].map(i => (
                <div key={i} className="card" style={{display: 'flex', flexDirection: 'coloumn', gap:'0.8rem'}}>
                <Skeleton height="24px" width="40%"/>
                <Skeleton height="16px" width="70%" />
                <Skeleton height="16px" width="55%"/>
                </div>
            ))}
        </div>
    )
    return(
        <div className="container">
            
            <div className='stats-grid' style={{display: 'grid', gridTemplateColoumns: '1fr 1fr 1fr', gap:'1rem', marginBottom:'1.5rem'}}>
                <div className="card" style={{textAlign:'center'}}>
                    <p style={{fontSize: '2rem', fontWeight:700, color:'#6366f1'}}>{projects.length}</p>
                    <p style={{color: '#6b7280', fontSize:'0.9rem'}}>Projects</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '2rem', fontWeight: 700, color: '#6366f1' }}>{totalVariations}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Variations</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '2rem', fontWeight: 700, color: '#6366f1' }}>{totalClicks}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Total Clicks</p>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
                <h1 style={{fontSize: '1.5rem', fontWeight:700}}>Your Projects</h1>
                <span style={{color:'#6b7280', fontSize:'0.9rem'}}>{projects.length}projects</span>
            </div>
            {projects.length ===0 ?(
                <div className="card" style={{textAlign:'center', padding:'3rem'}}>
                    <p style={{color: '#6b7280', marginBotoom:'1rem'}}>No projects yet!</p>
                    <a href="/create">
                        <button className="btn btn-primary">Create your url test</button>
                    </a>
                </div>
            ):(
                projects.map(project => (
                    <ProjectCard key= {project.id} project={project} onDelete= {handleDelete}/>
                ))
            )}
        </div>
    )
}

export default Home