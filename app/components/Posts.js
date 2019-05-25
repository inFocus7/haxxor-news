import React from 'react'
import { fetchPosts } from '../utils/requests'
import PropTypes from 'prop-types'
import Card from './Card'
import ReactHtmlParse from 'react-html-parser'
import Loading from './Loading'
import {FaSyncAlt} from 'react-icons/fa'

// Fix loading on component update

// IMPORTANT:
// IF IM FETCHING EVERYTHING TO FILTER OUT POSTS, MIGHT AS WELL SAVE ALL, THEN FILTER & SHOW

export function Post(props) {
    const post = props.post

    let reps = post.kids
    reps = reps ? reps.length : 0

    return (
        <Card 
            type={post.type} 
            date={post.time} 
            id={post.id} 
            by={post.by}
            url={post.url}
            extra={{comments: post.descendants ? post.descendants : 0, score: post.score, replies: post.kids ? post.kids.length : 0}}>

            {post.title && <h1 className='listing-title'>{post.title}</h1>}
            {post.title && post.text && <hr/>}
            {post.text && <div className='listing-text'>{ReactHtmlParse(post.text)}</div>}

        </Card>
    )
}
export default class Posts extends React.Component {
    state = {
        posts: [], // Currently fetched posts
        postIds: [], // All postIds toLoad
        curr: [], // 
        maxShow: 10,
        loading: true,
        error: null
    }

    static propTypes = {
        type: PropTypes.string.isRequired,
    }

    static defaultProps = {
        type: 'general',
        by: 'top'
    }

    fetch_Posts = async () => {
        if(this.props.type === 'user') {
            if(!this.state.posts['all']) {
                console.log('initializing')
                if(this.props.by === 'all') {
                    fetchPosts(this.props.type, 'all', this.props.ids)
                        .then((posts) => this.setState((prevState) => {
                            return {
                                posts: {...prevState.posts, all: posts},
                                curr: {...prevState.curr, all: 0},
                                loading: false, 
                                error: null
                            }}))
                        .catch(() => {this.setState({loading: false, error: 'Failed to fetch posts... 🙁'})})
                }
                else {
                    fetchPosts(this.props.type, 'all', this.props.ids)
                        .then((posts) => this.setState((prevState) => {
                            return {
                                posts: {...prevState.posts, all: posts, [this.props.by]: posts.filter((post) => {return post.type === this.props.by})},
                                curr: {...prevState.curr, all: 0, [this.props.by]: 0},
                                loading: false, 
                                error: null
                            }}))
                        .catch(() => {this.setState({loading: false, error: 'Failed to fetch posts... 🙁'})})
                }
            }
            else if(!this.state.posts[this.props.by]) {
                console.log('reusing all')
                this.setState((prevState) => {
                    return {
                        posts: {...prevState.posts, [this.props.by]: this.state.posts['all'].filter((post) => {return post.type === this.props.by})},
                        curr: {...prevState.curr, [this.props.by]: 0},
                        loading: false,
                        error: null
                    }
                })
            }       
            else {
                this.setState({loading: false, error: null})
            }
        }
        else {
            if(!this.state.posts[this.props.by]) {
                try {
                    console.log('a')
                    const posts = await fetchPosts(this.props.type, this.props.by)
                    console.log('h')
                    this.setState((prevState) => {
                        return {
                            posts: {...prevState.posts, [this.props.by]: posts},
                            loading: false,
                            error:null
                        }
                    })
                } catch (error) {
                    this.setState({loading: false, error: 'Failed to fetch posts... 🙁'})
                }
            }
            else {
                this.setState({loading: false, error:null})
            }
        }
    }

    componentDidMount() {
        this.fetch_Posts()
    }

    // Do an ifLoading check to not mess up loading too much.
    componentDidUpdate(prevProps) {
        if(this.props.by != prevProps.by) {
            this.setState({loading: true, error: null})
            this.fetch_Posts()
        }
    }

    render() {
        if(this.state.posts[this.props.by]) {
            return (
                <>
                    <ul className='posts'>
                        {this.state.posts[this.props.by].map((post) => {
                            if(post && !post.deleted)
                            {
                                return (
                                    <li key={post.id}>
                                        <Post post={post}/>
                                    </li>
                                )
                            }
                        })}

                        {this.state.posts[this.props.by].length === 0 && (
                            <h3 className='text-center' style={{padding: 20}}>No submissions found... 🙁</h3>)}
                    </ul>

                    <button type='button' id='reload' className='btn-clear'>
                        <FaSyncAlt 
                            color='rgb(14, 145, 206)' 
                            size={25}/>
                    </button>
                </>
            )
        }

        if(this.state.error)
            return <h1>{this.state.error}</h1>
        
        return <Loading text='Loading Posts'/>
    }
}

