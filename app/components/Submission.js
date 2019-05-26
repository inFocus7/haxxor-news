import React from 'react'
import {fetchPost} from '../utils/requests'
import Loading from './Loading'
import Card from './Card'
import {Post} from './Posts'
import queryString from 'query-string'

// Will do DFS from starting id to show all root comments + their children
//
class Comments extends React.Component {
    state = {
        replies: null,
        loading:true,
        error:null
    }

    async componentDidMount() {
        if(this.props.kids == null) {
            this.setState({
                replies: null,
                loading: false,
                error: null
            })
            return
        }

        try {
            const comments = await Promise.all(this.props.kids.map(kid => {return fetchPost(kid)}))

            this.setState({
                replies: comments,
                loading: false,
                error: null
            })
            
        } catch (error) {
            this.setState({
                replies: null,
                loading: false,
                error: 'Error loading comment(s).'
            })
        }
    }

    async componentDidUpdate(prevProps) {
        if(prevProps != this.props) {
            if(this.props.kids == null) {
                this.setState({
                    replies: null,
                    loading: false,
                    error: null
                })
                return
            }

            try {
                const comments = await Promise.all(this.props.kids.map(kid => {return fetchPost(kid)}))

                this.setState({
                    replies: comments,
                    loading: false,
                    error: null
                })
                
            } catch (error) {
                this.setState({
                    replies: null,
                    loading: false,
                    error: 'Error loading comment(s).'
                })
            }
        }
    }

    render() {
        if(this.state.loading)
            return <Loading text='Loading Comments'/>

            if(this.state.error)
                return <h3 className='text-center bad-response'>{this.state.error}</h3>

        return (
            <>
                <ul className='posts'>
                    {this.state.replies ? (
                        this.state.replies.map(reply => {
                            return (
                                <li key={reply.id}>
                                    <Post post={reply}/>
                                    
                                </li>
                            )
                        })
                    ) : <h3 className='text-center bad-response'>No replies.</h3>}

                </ul>
            </>
        )
    }
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
            
            if(!post) {
                this.setState({
                    loading: false,
                    error: 'Submission not found.',
                    post: null
                })
                return
            }

            this.setState({
                loading:false,
                error: null,
                post: post
            })
        } catch (error) {
            console.log('error')
            this.setState({
                loading:false,
                error: 'Error loading submission.'
            })
        }
    }


    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)
        
        this.fetch_Post(id)
    }

    componentDidUpdate(prevProps) {
        const prevId = queryString.parse(prevProps.location.search).id
        const currId = queryString.parse(this.props.location.search).id

        if(prevId !== currId) {
            this.fetch_Post(currId)
        }
    }


    render() {

        if(this.state.loading)
            return <Loading text='Loading Post'/>

        if(this.state.error)
            return <h3 className='text-center bad-response'>{this.state.error}</h3>

        // If comment load link to parent (or parent card) over the comment as reference.
        if(this.state.post) {
            return (
                <>
                    <Post post={this.state.post}/>
                    <hr/>
                    
                    <h5>{this.state.post.type === 'comment' ? 'Replies' : 'Comments'}</h5>
                    <Comments kids={this.state.post.kids}/>
                </>
            )
        }
    }
}