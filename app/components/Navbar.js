import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar(props) {    
    return (
        <nav className="navbar navbar-main">
            <div className="navbar-nav">
                {props.content.map((content) => {
                    return (
                        content.type === 'href' 
                            ? <Link 
                                    key={content.text}
                                    to={content.ref} 
                                    className="nav-item nav-link">
                                    {content.text}
                                </Link>
                            : null
                    )
                })}
            </div>
        </nav>
    )
}