const httpClient = async (optionsWithId = {}) => {
  const { id = '', ...options } = optionsWithId;

  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  try {
    const response = await fetch(
      `http://localhost:3000/notes/${id}`,
      defaultOptions
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    throw new Error(
      `There was a problem connecting to the server: ${error.message}`
    );
  }
};

export const noteHttpRequests = async ({ type, payload }) => {
  const { id = '', ...data } = payload;
  const httpGet = async () => await httpClient();

  const httpPost = async () => {
    return await httpClient({
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  const httpPatch = async () => {
    return await httpClient(
      {
        method: "PATCH",
        body: JSON.stringify(data),
        id
      }
    );
  };

  const httpDelete = async () => await httpClient({ method: "DELETE", id });

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
      throw new Error("Unknown operation");
  }
};