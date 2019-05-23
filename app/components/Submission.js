import React from 'react'
import {fetchPost} from '../utils/requests'
import Loading from './Loading'
import Card from './Card'
import {Post} from './Posts'

// Will do BFS from starting id to show all root comments + their children
function Children(props) {
    
}

export default class Submission extends React.Component {
    state = {
        post: null,
        loading: true,
        error: null
    }

    static defaultProps = {
        id: 1
    }

    fetch_Post = (id) => {
        fetchPost(id)
            .then((post) => this.setState({loading: false, error: null, post: post}))
            .catch(() => this.setState({
                loading: false,
                error: 'Error loading story.'
            }))
    }


    componentDidMount() {
        this.fetch_Post(this.props.match.params.id)
    }


    render() {
        if(this.state.loading)
            return <Loading text='Loading Post'/>

        if(this.state.error)
            return <div className='error'>Error loading post.</div>
        
        // <span>{JSON.stringify(this.state.post)}</span>
        // If comment load link to parent (or parent card) over the comment as reference.
        return (
            <>
                <Post post={this.state.post}/>
                <hr/>
                <h5>{this.state.post.type === 'comment' ? 'Replies' : 'Comments'}</h5>
            </>
        )
    }
}