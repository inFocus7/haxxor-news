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
            if(window.location.pathname === '/') {
                console.log('statc: ', this.selected)
                this.setState({selected: 'Top'})
            }
            else if(window.location.pathname === '/new') {
                this.setState({selected: 'New'})
            }
        }
    }

    render() {
        {//
        
        }
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