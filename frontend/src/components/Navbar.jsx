import {Link} from 'react-router-dom'

function Navbar(){
    return(
        <nav style={{
            background:'#6366f1',
            padding: '1 rem 2 rem',
            display: 'flex',
            alignItems:'center',
            justifyContent: 'space-between',
        }}>
            <Link to = "/" style={{color:"white", fontSize: '1.3rem', fontWeight:700}}>
            UrlAnalytics
            </Link>
            <Link to="/create">
                <button className='btn' styles={{background:'white', color:'#6366f1', fontWeight:600}}>
                    New Project
                </button>
            </Link>
        </nav>
    )
}

export default Navbar