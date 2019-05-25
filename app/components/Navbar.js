import React from 'react'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom'

// TODO: Full redesign based on route? 
// Depends on how I plan on using navs later on and if I'd make then for dynamic in-page content or not

// Hard-coding the location/path :-/ 
function pathParser(route) {
    let path = window.location.pathname

    if(route === 'main') {
        if(path === '/')
            return 'Top'
        
        if(path === '/new' || path === '/new/')
            return 'New'
    }
    else if (route === 'user') {
        // remove leading '/user/'
        path = path.slice(6, path.length)

        if(path.indexOf('/') === -1)
            return 'All'

        path = path.substring(path.indexOf("/") + 1)

        switch (path) {
            case '':
                return 'All'
            case 'stories' || 'stories/':
                return 'Stories'
            case 'comments' || 'comments/':
                    return 'Comments'
            case 'polls' || 'polls/':
                    return 'Polls'
            default:
                return 'All';
        }
    }
}
@withRouter
class Navbar extends React.Component {   
    state = {
        selected: this.props.default
    }

    onRouteChange = () => {
        this.setState({
            selected: pathParser(this.props.route)
        })
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.pathname !== prevProps.location.pathname)
            this.onRouteChange();
    }

    componentDidMount() {
        this.setState({
            selected: pathParser(this.props.route)
        })
    }

    render() {
        return (
            <nav className="navbar navbar-main">
                <div className="navbar-nav">
                    {this.props.content.map((content) => {
                        return (
                            content.type === 'href' 
                                ? (<Link 
                                        key={content.text}
                                        to={content.ref} 
                                        className={`nav-item nav-link ${this.state.selected === content.text && 'selected-nav-link'}`}>                                        {content.text}
                                    </Link>)
                                : null
                        )
                    })}
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)