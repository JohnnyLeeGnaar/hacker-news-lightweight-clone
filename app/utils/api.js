const API_URL = "https://hacker-news.firebaseio.com/v0";

//get the initial list of stories by passing an argument that satisfies the HN api, examples like topstories, newstories
export function getPosts(type) {
  return fetch(
    `${API_URL}/${type}.json?print=pretty&limitToFirst=10&orderBy="$key"`
  )
    .then((response) => response.json())
    .then(getItems);
}

export function getPost(id) {
  return fetch(`${API_URL}/item/${id}.json?print=pretty`).then((response) =>
    response.json()
  );
}
//after getting the id of the story as an argument, fetch returns an json object that has a property of 'kids' in an array which you can pass to fetchItems


//general use purpose function to fetch a larger amount of data. You have to pass an array as an argument
export function getItems(items = []) {
  let promises = items.map((item) => {
    return fetch(`${API_URL}/item/${item}.json`).then((result) =>
      result.json()
    );
  });
  return Promise.all(promises);
}
