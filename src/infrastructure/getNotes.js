const getNotes = async () => {
    try {
        const response = await fetch(`http://localhost:3000/notes`);
        if(!response.ok) {
            throw new Error('Erro ao tentar listar as notas!');
        }
        const data = await response.json();
        return data;
    } catch(error) {
        throw new Error(error);
    }
}

export { getNotes }