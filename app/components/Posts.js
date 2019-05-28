import React from 'react'
import ReactDOM from 'react-dom'
import { fetchPosts, fetchPostsIds } from '../utils/requests'
import PropTypes from 'prop-types'
import Card from './Card'
import ReactHtmlParse from 'react-html-parser'
import Loading from './Loading'
import {FaSyncAlt, FaFilter} from 'react-icons/fa'

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
        posts: [],
        loadedPosts: [], // Currently fetched/stored posts
        loadedAmt: [], // current amt loaded
        MPL: 10, // "max (shown) per load"
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

    postLogic = async () => {
        try {
            const currLoaded = (this.state.loadedPosts[this.props.by] == null) ? 0 : this.state.loadedPosts[this.props.by].length
            const posts = await fetchPosts(this.props.type, this.props.by, this.state.posts[this.props.by].slice(currLoaded, currLoaded + this.state.MPL))
            this.setState(prevState => {
                const newPosts = prevState.loadedPosts[this.props.by] ? prevState.loadedPosts[this.props.by].concat(posts) : posts
                return {
                    loading: false,
                    error: null,
                    loadedPosts: {...prevState.loadedPosts, [this.props.by]: newPosts }
                }
            })
        } catch (error) {
            this.setState({loading: false, error: error})
        }
    }

    loadPosts = async () => {
        if(this.props.type === 'user') {
            if(this.props.by === 'all') {
                this.postLogic()
            }
            else if(!this.state.loadedPosts['all']) {

            }
            else {

            }
        } 
        else
            this.postLogic()
    }

    fetch_Posts = async () => {
        if(!this.state.posts[this.props.by]) {
            let postIds = (this.props.type === 'general')
                ? await fetchPostsIds(this.props.by)
                : this.props.ids
                        
            this.setState(prevState => {
                return {
                    posts: {...prevState.posts, [this.props.by]: postIds},
                }
            }, () => this.loadPosts())
        } else {
            this.loadPosts()
        }
    }

    // fetch_Posts = async () => {
    //     if(this.props.type === 'user') {
    //         if(!this.state.posts['all']) {
    //             if(this.props.by === 'all') {
    //                 try {
    //                     console.log(this.props.ids.slice(0, 0 + 10))
    //                     const posts = await fetchPosts(this.props.type, 'all', this.props.ids.slice(0, 0 + this.state.MPL))
    //                     this.setState((prevState) => {
    //                         return {
    //                             posts: {...prevState.posts, all: posts},
    //                             curr: {...prevState.curr, all: 0},
    //                             loading: false, 
    //                             error: null
    //                         }})
    //                 } catch (error) {
    //                     this.setState({loading: false, error: 'Failed to fetch posts... 🙁'})
    //                 }
    //             }
    //             else {
    //                 try {
    //                     const posts = await fetchPosts(this.props.type, 'all', this.props.ids)
    //                     this.setState(prevState => {
    //                         return {
    //                             posts: {...prevState, all: posts, [this.props.by]: posts.filter(post => {return post.type === this.props.by})},
    //                             curr: {...prevState.curr, all: 0, [this.props.by]: 0},
    //                             loading: false, 
    //                             error: null
    //                         }
    //                     })
    //                 } catch (error) {
    //                     this.setState({loading: false, error: 'Failed to fetch posts... 🙁'})
    //                 }
    //             }
    //         }
    //         else if(!this.state.posts[this.props.by]) {
    //             this.setState((prevState) => {
    //                 return {
    //                     posts: {...prevState.posts, [this.props.by]: this.state.posts['all'].filter((post) => {return post.type === this.props.by})},
    //                     curr: {...prevState.curr, [this.props.by]: 0},
    //                     loading: false,
    //                     error: null
    //                 }
    //             })
    //         }       
    //         else {
    //             this.setState({loading: false, error: null})
    //         }
    //     }
    //     else {
    //         if(!this.state.posts[this.props.by]) {
    //             try {
    //                 const posts = await fetchPosts(this.props.type, this.props.by)
    //                 this.setState((prevState) => {
    //                     return {
    //                         posts: {...prevState.posts, [this.props.by]: posts},
    //                         loading: false,
    //                         error:null
    //                     }
    //                 })
    //             } catch (error) {
    //                 this.setState({loading: false, error: 'Failed to fetch posts... 🙁'})
    //             }
    //         }
    //         else {
    //             this.setState({loading: false, error:null})
    //         }
    //     }
    // }

    handleScroll = (e) => {
        if(!this.state.loading && $(window).scrollTop() + $(window).height() + .5 >= $(document).height()) {
            if(this.props.type === 'user' && this.state.posts[this.props.by] && this.state.loadedPosts[this.props.by].length < this.state.posts[this.props.by].length) {
                this.setState({loading: true, error: null})
                this.fetch_Posts()
            } else if(this.props.type === 'general' && this.state.posts[this.props.by] && this.state.loadedPosts[this.props.by].length < this.state.posts[this.props.by].length) {
                this.setState({loading: true, error: null})
                this.fetch_Posts()            
            }
        }
    }

    componentDidMount() {
        this.scrollListener = window.addEventListener('scroll', this.handleScroll)
        this.fetch_Posts()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollListener)
    }

    componentDidUpdate(prevProps) {
        if(this.props.by != prevProps.by && !this.state.loadedPosts[this.props.by]) {
            this.setState({loading: true, error: null})
            this.fetch_Posts()
        }
    }

    render() {
        if(this.state.loadedPosts[this.props.by]) {
            return (
                <div>
                    <ul className='posts'>
                        {this.state.loadedPosts[this.props.by].map((post) => {
                            if(post && !post.deleted)
                            {
                                return (
                                    <li key={post.id}>
                                        <Post post={post}/>
                                    </li>
                                )
                            }
                        })}

                        {this.state.loadedPosts[this.props.by].length === 0 && (
                            <h3 className='text-center bad-response'>No submissions found... 🙁</h3>)}
                    </ul>

                    {this.state.loading && <Loading text='Loading Posts'/>}

                    <button type='button' id='reload' className='btn-clear'>
                        <FaSyncAlt 
                            color='rgb(14, 145, 206)' 
                            size={25}/>
                    </button>

                    <button type='button' id='filter' className='btn-clear'>
                        <FaFilter 
                            color='rgb(130, 130, 130)' 
                            size={25}/>
                    </button>
                </div>
            )
        }

        if(this.state.error)
            return <h3 className='text-center bad-response'>{this.state.error}</h3>
        
        return <Loading text='Loading Posts'/>
    }
}