import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
    return(
        <nav>
            <h1>COVID 19 Database</h1>
            <div className='link-container'>
                <Link to='/'>Data</Link>
                <Link to='/about'>About</Link>
            </div>
            
        </nav>
    )
}

export default Nav