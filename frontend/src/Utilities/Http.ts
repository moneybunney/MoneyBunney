const {
  REACT_APP_API_HOST: API_HOST,
  REACT_APP_API_PORT: API_PORT
} = process.env;

if (API_HOST === undefined || API_PORT === undefined) {
  alert(
    "You are missing some environment variables. Have you copied the " +
      ".env.example file into .env? Have you perhaps missed some necessary " +
      "environment variables in the file?"
  );
}

export const http = (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const uri = `http://${API_HOST}:${API_PORT}${input}`;

  const options: RequestInit = {
    credentials: "include",
    ...init
  };

  return fetch(uri, options);
};

export const post = (
  input: RequestInfo,
  body: object,
  init?: RequestInit
): Promise<Response> => {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    ...init
  };

  return http(input, options);
};
