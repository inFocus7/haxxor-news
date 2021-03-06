import React from 'react'
import {fetchUser} from '../utils/requests'
import Navbar from './Navbar'
import Posts from './Posts'
import ReactHtmlParse from 'react-html-parser'
import ReactLoading from 'react-loading'
import Loader from './Loading'

export default class User extends React.Component {
    state = {
        loading: true,
        error: null,
        user: null,
        posts: {'stories': null, 'comments': null, 'polls': null}
    }
    
    async componentDidMount() {
        try {
            const user = await fetchUser(this.props.match.params.id)
            this.setState({
                user: user,
                error: null,
                loading: false
            })
        } catch (error) {
            this.setState({
                user: null,
                error: 'Error fetching user.',
                loading: false
            })
        }
    }

    render() {
        if(this.state.loading)
            return <Loader text='Loading User'/>

        if(this.state.error)
            return <h3 className='text-center bad-response'>{this.state.error}</h3>

        const user = this.state.user
        let by = this.props.match.params.view ? this.props.match.params.view : 'all' 
        let def = by.charAt(0).toUpperCase() + by.slice(1)

        switch (by) {
            case 'stories':
                by = 'story'
                break;
            case 'comments':
                by = 'comment'
                break;
            case 'polls':
                by = 'poll'
                break;
            default:
                break;
        }

        return (
            <div className='profile'>
                <div className='info-left badge badge-primary'>{user.karma.toLocaleString()}</div>
                <h1 className='username'>{user.id}</h1>
                {user.about && <p className='about'>{ReactHtmlParse(user.about)}</p>}

                <Navbar 
                    route='user' 
                    content={[
                        {text: 'All', type: 'href', ref: `/user/${user.id}`}, 
                        {text: 'Stories', type: 'href', ref: `/user/${user.id}/stories`}, 
                        {text: 'Comments', type: 'href', ref: `/user/${user.id}/comments`}, 
                        {text: 'Polls', type: 'href', ref: `/user/${user.id}/polls`}]}/>
                        
                {user.submitted 
                    ? <Posts type='user' by={by} ids={user.submitted}/> 
                    : <h3>No posts found.</h3>}
            </div>
        )
    }
}