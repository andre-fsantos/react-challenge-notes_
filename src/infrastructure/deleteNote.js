const fetchDeleteNote = async id => {
    try {
        const options = {
            method: 'DELETE'
        };

        const url = `http://localhost:3000/notes/${ id }`;

        const response = await fetch(url, options);

        if(!response.ok) {
            console.log('Erro ao tentar excluir a nota!');
        }

        const data = await response.json();
        return data;

    } catch(error) {
        console.log(error);
    }
}

export { fetchDeleteNote }