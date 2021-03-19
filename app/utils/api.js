const API_URL = "https://hacker-news.firebaseio.com/v0";

//get the initial list of stories by passing an argument that satisfies the HN api, examples like topstories, newstories
export function getPosts(type) {
  return fetch(
    `${API_URL}/${type}.json?print=pretty&limitToFirst=50&orderBy="$key"`
  )
    .then((response) => response.json())
    .then(getItems);
}

export function getPost(id) {
  return fetch(`${API_URL}/item/${id}.json?print=pretty`).then((response) =>
    response.json()
  );
}

function getErrorMsg(user) {
  return `Username ${user} doesn't exist`;
}

export function getUser(id) {
  return fetch(`${API_URL}/user/${id}.json?print=pretty`)
    .then((response) => response.json())
    .then((user) => {
      if (!user) {
        throw new Error(getErrorMsg(id));
      }
      return user;
    });
}

function filterPost(post, typeOfPost = "story") {
  return post.filter(
    ({ type, deleted }) => type === typeOfPost && deleted !== true
  );
}

//general use purpose function to fetch a larger amount of data. You have to pass an array as an argument
export function getItems(items = [], typeOfPost) {
  let promises = items.map((item) => {
    return fetch(`${API_URL}/item/${item}.json`).then((result) =>
      result.json()
    );
  });
  return Promise.all(promises).then((posts) => filterPost(posts, typeOfPost));
}
