import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProject,updateProject } from "../api/client";

const getLabel = (index) => `Variation ${String.fromCharCode(65 + index)}`

function EditProject(){
    const{id} = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const[existingVariations, setExistingVariations] = useState([])
    const[newVariations, setNewVariations] = useState([])
    const[loading, setLoading] = useState(true)
    const[saving, setSaving] = useState(false)
    const[error, setError] = useState('')

    useEffect(() => {
        getProject(id)
        .then(res =>{
            setName(res.data.name)
            setExistingVariations(res.data.variations)
        })
        .finally(()=> setLoading(false))
    }, [id])

    const addVariation = () => {
        setNewVariations(prev => {
            const usedLabels = [
                ...existingVariations.map(v=>v.label),
                ...prev.map(v=>v.label)
            ]
            let index = 0
            while(usedLabels.includes(getLabel(index))) index++
            return [...prev, {label:getLabel(index), target_url:''}]
        })
    }

    const removeNewVariation = (index) => {
        setNewVariations(prev => prev.filter((_,i) => i!== index))
    }

    const updateNewVariation = (index, field, value)=>{
        setNewVariations(prev => prev.map((v,i) => i === index ? {...v, [field]: value}:v))
    }
    const handleSave = async() => {
        if (!name.trim()) return setError('Project name is required')
        if (newVariations.some(v => !v.target_url.trim())) return setError('All new urls are required')
        if(newVariations.some(v => !v.label.trim())) return setError('All variation names are required')

        setSaving(true)
        setError('')
        try{
            await updateProject(id, {
                name,
                new_variations: newVariations.length > 0 ? newVariations : undefined
            })
            navigate('/')
        } catch(e){
            setError('Failed to save. Try again')
        }finally {
            setSaving(false)
        }
    }

    if(loading) return <div className="container">Loading...</div>

    return (
        <div className="container" style={{maxWidth:'700px'}}>
            <button className="btn btn-secondary" onClick={() => navigate('/')}styles={{marginBottom: '1rem'}}>
                Back
            </button>
            <h1 style={{fontSize:'1.5rem', fontWeight:700, marginBottom:'1.5rem'}}>Edit Project</h1>
            <div className="card">
                <label style={{fontWeight:600, display:'block', marginBottom:'0.4rem'}}>Project Name</label>
                <input
                value={name}
                onChange={e => setName(e.target_value)}
                style = {{width :'100%', padding:'0.6rem', borderRadius:'8px', border:'1px solid #e5e7eb', fontSize:'0.95rem'}}
                />
            </div>
            <h2 style={{fontWeight:600, margin:'1rem 0 0.5rem'}}>Existing Variations</h2>
            {existingVariations.map(v => (
                <div className="card" key ={v.id} style={{opacity:0.7}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <span style={{fontWeight:600}}>{v.label}</span>
                        <span style={{fontSize: '0.85rem', color:'#6b7280'}}>{v.click_count} clicks</span>
                    </div>
                    <p style={{fontSize:'0.085rem', color:'#6b7280', marginTop:'0.3rem'}}>{v.target_url}</p>
                </div>
            ))}
            <h2 style ={{fontWeight : 600, margin: '1rem 0 0.5rem'}}>Add New Variations</h2>
            {newVariations.map((v,i) => (
                <div className="card" key= {i}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems: 'center', marginBottom:'0.8rem'}}>
                        <input
                            value={v.label}
                            onChange={e => updateNewVariation(i,'label', e.target.value)}
                            placeholder="Variation name"
                            style={{fontWeight:600, border:'1px solid #e5e7eb', borderRadius:'8px', fontSize:'0.95rem', padding:'0.4rem 0.6rem', width:'60%'}}
                            />
                        <button className="btn btn-danger" onClick={() => removeNewVariation(i)} style={{fontSize:'0.8rem'}}>
                            Remove
                        </button>
                    </div>
                    <input
                    value={v.target_url}
                    onChange={e=> updateNewVariation(i, 'target_url', e.target.value)}
                    placeholder="httpls://yoursite.com/page"
                    style={{width:'100%', padding:'0.6rem', borderRadius:'8px', border:'1px solid #e5e7eb', fontSize:'0.95rem'}}
                    />
                </div>
            ))}

            <button className="btn btn-secondary" onClick={addVariation} style={{marginBottom:'1rem'}}>
                Add Variation
            </button>
            {error && <p style={{color: '#rf4444', marginBottom:'1rem'}}>{error}</p>}
            <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{width:'100%', padding:'0.8rem'}}>
                {saving ? 'Saving...': 'Save Changes'}
            </button>
        </div>
    )
}

export default EditProject