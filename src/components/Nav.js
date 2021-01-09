import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
    return(
        <nav>
            <div className='nav-container'>
                <h1>COVID 19 Database</h1>
                <div className='link-container'>
                    <Link className='nav-link' to='/'>Data</Link>
                    <Link className='nav-link' to='/about'>About</Link>
                </div>
            </div>
            
            
        </nav>
    )
}

export default Nav