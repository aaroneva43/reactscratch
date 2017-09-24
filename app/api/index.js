

export default {
    fetch: (
        entity = 'posts',
        params = '',
        url = 'https://jsonplaceholder.typicode.com/posts'
    ) => {
        return fetch(url + '/' + params)
            .then(response => response.json())
    }
}