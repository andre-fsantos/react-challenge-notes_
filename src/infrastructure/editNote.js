const editNote = async ({ id, title, description }) => {
    try {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        };

        const url = `http://localhost:3000/notes/${ id }`;

        const response = await fetch(url, options);

        if(!response.ok) {
            console.log('Erro ao tentar editar a nota!');
        }
            
        const data = await response.json();
        return data;

    } catch(error) {
        console.log(error);
    }
}

export { editNote }