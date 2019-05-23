import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import Navbar from './components/Navbar'
import Loading from './components/Loading'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavProvider } from './context/navigation'

const Submission = React.lazy(() => import('./components/Submission'))
const Posts = React.lazy(() => import('./components/Posts'))
const User = React.lazy(() => import('./components/User'))

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='container' style={{padding: '0 25px', margin: 'none', maxWidth: 'inherit', minWidth: '350px'}}>
                    <Navbar route='main' content={[{text: 'Top', ref: '/', type: 'href'}, {text: 'New', ref: '/new', type: 'href'}, {text: '🔦', ref: '#', type: 'func'}]}/>
                    <React.Suspense fallback={<Loading text='Loading Content'/>}>
                        <Switch>
                            <Route exact path='/' render={() => <Posts by='top' type='general'/>}/>
                            <Route path='/new' render={() => <Posts by='new' type='general'/>}/>
                            <Route exact path='/user/:id' component={User}/>
                            <Route path='/user/:id/:view' component={User}/>
                            <Route path='/submission/:id' component={Submission}/>
                            <Route render={() => <h1>404: Not Found... 😦</h1>}/>
                        </Switch>
                    </React.Suspense>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
)