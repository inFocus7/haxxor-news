import React from 'react'
import {fetchPost} from '../utils/requests'
import Loading from './Loading'
import Card from './Card'
import {Post} from './Posts'
import queryString from 'query-string'
// Will do DFS from starting id to show all root comments + their children
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

    fetch_Post = async (id) => {
        try {
            const post = await fetchPost(id)
            this.setState({
                loading:false,
                error: null,
                post: post
            })
        } catch (error) {
            this.setState({
                loading:false,
                error: 'Error loading submission.'
            })
        }
    }


    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)
        
        if(id)
            this.fetch_Post(id)
        else 
            this.fetch_Post(1)
    }


    render() {
        if(this.state.loading)
            return <Loading text='Loading Post'/>

        if(this.state.error)
            return <div className='error'>Error loading post.</div>
        
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