const api = 'https://hacker-news.firebaseio.com/v0'

export async function fetchPosts(type='general', by, ids=null) {
    try {
        const posts = Promise.all(ids.map((postId) => {return fetchPost(postId)}))
        
        if(type === 'general' || by === 'all')
            return posts
        
        return posts.filter((post) => {return post.type === by})
    } catch(error) {
        throw new Error(`Unable to fetch ${by} posts.`)
    }
}

export async function fetchPostsIds(by) {
    try {
        const posts = await fetch(`${api}/${by}stories.json`)
        return posts.json()
    } catch(error) {
        throw new Error(`Unable to fetch ${by} stories.`)
    }
}

export async function fetchPost(post_id) {
    try {
        const post = await fetch(`${api}/item/${post_id}.json`)
        return post.json()
    } catch(error) {
        throw new Error(`Unable to fetch submission #${post_id}.`)
    }
}

export async function fetchUser(user_id) {    
    try {
        const user = await fetch(`${api}/user/${user_id}.json`)
        return user.json()
    } catch (error) {
        throw new Error(`Unable to find ${user_id}`)
    }
}

export async function fetchComments(post_id) {

}