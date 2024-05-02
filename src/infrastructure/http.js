const fetchData = async (options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}, noteId = '') => {
    try {
        const response = await fetch(`http://localhost:3000/notes/${noteId}`, options);

        if(!response.ok) {
            console.log('Erro de requisição!');
            return;
        }

        return response.json();
    } catch (error) {
        console.log(error);
    }
}

export const httpGet = async () => await fetchData();

export const httpPost = async data => {
    return await fetchData({
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export const httpPatch = async (data, noteId) => {
    return await fetchData({
        method: 'PATCH',
        body: JSON.stringify(data)
    }, noteId);
}

export const httpDelete = async noteId => await fetchData({method: 'DELETE'}, noteId);