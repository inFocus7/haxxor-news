import React from 'react'
import {Link} from 'react-router-dom'


// TODO: Full redesign based on route? 
// Depends on how I plan on using navs later on and if I'd make then for dynamic in-page content or not
export default class Navbar extends React.Component {   
    state = {
        selected: this.props.default
    }

    componentDidMount() {
        // Set Up 'main' nav bar which is top-most. Based on my route.
        if(this.props.route === 'main') {
            // Event listener on link change
            this.linklistener = window.onhashchange = function() {
                console.log("HASH HCHAD")
                if(window.location.pathname !== '/' || window.location.pathname !== '/new') {
                    this.setState({selected: ''})
                }
            }

            if(window.location.pathname === '/') {
                this.setState({selected: 'Top'})
            }
            else if(window.location.pathname === '/new') {
                this.setState({selected: 'New'})
            }
        }
    }

    componentWillUnmount() {
        if(this.linklistener)
            window.removeEventListener(this.linklistener)
    }

    render() {

        return (
            <nav className="navbar navbar-main">
                <div className="navbar-nav">
                    {this.props.content.map((content, index) => {
                        return (
                            content.type === 'href' 
                                ? (<Link 
                                        key={content.text}
                                        to={content.ref} 
                                        className={`nav-item nav-link ${this.state.selected === content.text && 'selected-nav-link'}`}
                                        onClick={() => {this.setState({selected: content.text})}}>
                                        {content.text}
                                    </Link>)
                                : null
                        )
                    })}
                </div>
            </nav>
        )
    }
}