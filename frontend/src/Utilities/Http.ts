const { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } = process.env;

if (
  REACT_APP_BACKEND_HOST === undefined ||
  REACT_APP_BACKEND_PORT === undefined
) {
  alert(
    "You are missing some environment variables. Have you copied the " +
      ".env.example file into .env? Have you perhaps missed some necessary " +
      "environment variables in the file?"
  );
}

export const http = (
  input: RequestInfo,
  init?: RequestInit,
  querryParams?: Map<string, string>
): Promise<Response> => {
  const uri = `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}${input}`;
  const url = new URL(uri);

  if (querryParams) {
    querryParams.forEach((val, key) => {
      url.searchParams.append(key, val);
    });
  }

  const options: RequestInit = {
    credentials: "include",
    ...init
  };
  return fetch(url.href, options);
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

export const get = (
  input: RequestInfo,
  params?: Map<string, string>,
  init?: RequestInit
): Promise<Response> => {
  const options: RequestInit = {
    method: "GET"
  };
  return http(input, options, params);
};

// Let's pretend this is a GET request :)
export const getPost = (
  input: RequestInfo,
  params?: Map<string, string>,
  body?: object,
  init?: RequestInit
): Promise<Response> => {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : "",
    ...init
  };
  return http(input, options, params);
};
