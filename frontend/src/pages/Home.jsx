import { useState, useEffect} from "react";
import {getProjects} from '../api/client'
import ProjectCard from "../components/ProjectCard";

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

    if(loading) return <div className="container">Loading...</div>
    return(
        <div className="container">
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