const httpClient = async (options = {}, noteId = "") => {
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };
  try {
    const response = await fetch(
      `http://localhost:3000/notes/${noteId}`,
      defaultOptions
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    throw new Error(
      `Ocorreu um problema de conexão com o servidor: ${error.message}`
    );
  }
};

export const noteHttpRequests = async ({ type, payload, noteId }) => {
  const httpGet = async () => await httpClient();

  const httpPost = async () => {
    return await httpClient({
      method: "POST",
      body: JSON.stringify(payload),
    });
  };

  const httpPatch = async () => {
    return await httpClient(
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
      noteId
    );
  };

  const httpDelete = async () => await httpClient({ method: "DELETE" }, noteId);

  switch (type) {
    case "getNotes":
      return await httpGet();
    case "setNote":
      return await httpPost();
    case "editNote":
      return await httpPatch();
    case "deleteNote":
      return await httpDelete();
    default:
      throw new Error("Operação desconhecida");
  }
};