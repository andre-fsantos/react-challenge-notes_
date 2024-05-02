const fetchData = async (url, options) => {
    try {
        const response = await fetch(url, options);

        if(!response.ok) {
            console.log('Erro de requisição!');
            return;
        }

        return response.json();
    } catch (error) {
        console.log(error);
    }
}

export const httpGet = async url => {
    return await fetchData(url, {
        method: 'GET'
    });
}

export const httpPost = async (url, data) => {
    return await fetchData(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

export const httpPatch = async (url, data) => {
    return await fetchData(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

export const httpDelete = async url => {
    return await fetchData(url, {
        method: 'DELETE'
    });
}