const {
  REACT_APP_API_HOST: API_HOST,
  REACT_APP_API_PORT: API_PORT
} = process.env;

export const http = (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const uri = `http://${API_HOST}:${API_PORT}${input}`;
  return fetch(uri, init);
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
    body: JSON.stringify(body)
  };

  // If there are overrides of options
  Object.assign(options, init);

  return http(input, options);
};
