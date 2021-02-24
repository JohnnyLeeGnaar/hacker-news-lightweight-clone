
//get the initial list of stories by passing an argument that satisfies the HN api, examples like topstories, newstories
export function getPosts(type) {

    console.log(type);
    return fetch(`https://hacker-news.firebaseio.com/v0/${type}.json?print=pretty&limitToFirst=10&orderBy="$key"`)
        .then(response => response.json())
        .then(posts => fetchItems(posts))
}
//after getting the id of the story as an argument, fetch returns an json object that has a property of 'kids' in an array which you can pass to fetchItems

//problem koji imam je da ne znam kako da fetcham naslova Clanka uz komentare. Ova funkcija ispod fetcha "Clanak", te mogu povuci posts.title, ali meni treba posts.kids
//koji dalje proslijedim u fetchItems funkciju. Pokusao sam default params imati za fetchItems, pa title naknadno kao argument ubaciti, pa eventualno kao response vratiti, al ne radi
// jedini nacin koji vidim je da napravim nes tipa getPostsTitle funkciju, pa opet fetcham samo naslov, al stalno me kopka da postoji bolji nacin
export function getComments(id) {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then(response => response.json())
        .then(posts => {
            var comments = posts.kids
            return fetchItems(comments)
        })
}
//general use purpose function to fetch a larger amount of data. You have to pass an array as an argument
function fetchItems(items) {
    var test = [];
    var promises = [];

    test = items.map(post => {
        var post;
        post = fetch(`https://hacker-news.firebaseio.com/v0/item/${post}.json`).then(result => result.json()).then(data => data)

        promises.push(post);
        console.log(Array.isArray(promises))
    })
    return Promise.all(promises)
        .then((response) => {
            console.log(Array.isArray(response))
            return response
        })
}
