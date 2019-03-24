export const http = (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => fetch(input, init);

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
