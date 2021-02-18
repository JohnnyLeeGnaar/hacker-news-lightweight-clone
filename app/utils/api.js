

export function getPosts() {

    return fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limitToFirst=10&orderBy="$key"')
    .then(response => response.json())
    .then(posts => {var test = [], promises = []
       test = posts.map(post => {
        var post;
        post = fetch(`https://hacker-news.firebaseio.com/v0/item/${post}.json`).then(result => result.json()).then(data => data)
        promises.push(post);  
        console.log(Array.isArray(promises))
    })   
       return Promise.all(promises)
       .then((response) => {
        console.log(Array.isArray(response))   
        return response })
})
}
//.then(posts => new Promise((resolve, reject) => { setTimeout(resolve, 2000, posts)}))