const api = 'https://hacker-news.firebaseio.com/v0'

function errorCheck(content, type) {
    if(content && content.error) {
        throw new Error(`Unable to fetch ${type}.`)
    }
}

export function fetchPosts(type='general', by, ids=null) {
    if(type === 'general') {
        return fetchPostsIds(type, by)
            .then((postIds) => {   
                errorCheck(postIds, 'posts')
                return Promise.all(postIds.map((postId) => {return fetchPost(postId)}))
            })
    }
    else if (type === 'user') {
        console.log('fetching user content: ', ids, by)
        return Promise.all(ids.map((postId) => {return fetchPost(postId)}))
            .then((posts) => {
                if(by === 'all')
                    return posts
                
                return posts.filter((post) => {return post.type === by})
            })
    } 
}

export function fetchPostsIds(type, by) {
    if(type === 'general') {
        switch (by) {
            case 'top':
                return fetch(`${api}/topstories.json`)
                    .then((res) => res.json())
                    .then((post_ids) => {
                        errorCheck(post_ids, 'posts')
                        return post_ids
                    })
            case 'new':
                return fetch(`${api}/newstories.json`)
                    .then((res) => res.json())
                    .then((post_ids) => {
                        errorCheck(post_ids, 'posts')
                        return post_ids
                    })
            default:
                return fetch(`${api}/topstories.json`)
                    .then((res) => res.json())
                    .then((post_ids) => {
                        errorCheck(post_ids, 'posts')
                        return post_ids
                    })
        }
    }
}

export function fetchPost(post_id) {
    return fetch(`${api}/item/${post_id}.json`)
        .then((res) => res.json())
        .then((post) => {
            errorCheck(post, 'post')
            //console.log('returning ', post)
            return post
        })
}

export function fetchUser(user_id) {    
    return fetch(`${api}/user/${user_id}.json`)
        .then((res) => res.json())
        .then((user) => {
            errorCheck(user, 'user')
            return user
        })
}

export function fetchComments(post_id) {

}