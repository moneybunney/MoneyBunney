export const http = (
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> => fetch(input, init);

export const post = (
  input: RequestInfo,
  body: object,
  init?: RequestInit,
): Promise<Response> => {

  const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
  };

  // If there are overrides of options
  Object.assign(options, init);

  return http(input, options);
};

export const get = (
  inputUrl: string,
  params: Map<string, string>,
  init?: RequestInit,
): Promise<Response> => {

  const options: RequestInit = {
      method: "GET",
  };
  console.log("Constructing url from:" + "localhost" + inputUrl);
  const url = new URL("http://localhost:3000" + inputUrl);
  // If there are overrides of options
  Object.assign(options, init);
  params.forEach((val, key) => {url.searchParams.append(key, val); });
  return http(url.href, options);
};
