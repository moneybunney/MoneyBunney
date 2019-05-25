import { act, renderHook } from "react-hooks-testing-library";
import waitForExpect from "wait-for-expect";

import useApi from "../useApi";

jest.useFakeTimers();

const sleep = (t: number) => new Promise(resolve => setTimeout(resolve, t));

describe("useApi() hook", () => {
  it("Changes loading value from false to true when finishes the API callback", async () => {
    const { result } = renderHook(() =>
      useApi(async () => {
        await sleep(1000000);
        return ["bar"];
      }, ["foo"])
    );

    expect(result.current.loading).toBe(true);

    act(() => jest.runAllTimers());

    await waitForExpect(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("Changes the data from the initial value to the data returned from the API", async () => {
    const initialData = ["foo"];
    const apiData = ["bar"];
    const { result } = renderHook(() =>
      useApi(async () => {
        await sleep(1000000);
        return apiData;
      }, initialData)
    );

    expect(result.current.data).toBe(initialData);

    act(() => jest.runAllTimers());

    await waitForExpect(() => {
      expect(result.current.data).toBe(apiData);
    });
  });

  it("Sets the error value when the api callback throws", async () => {
    const { result } = renderHook(() =>
      useApi(async () => {
        await sleep(1000000);
        throw new Error();
      }, ["foo"])
    );

    expect(result.current.error).toBe(null);

    act(() => jest.runAllTimers());

    await waitForExpect(() => {
      expect(result.current.data).not.toBe(null);
    });
  });

  it("Calls the given API callback function again when arguments change", async () => {
    const callback = jest.fn();
    let arg = "foo";
    renderHook(() =>
      useApi(
        async (s: string) => {
          callback(s);
          return [s];
        },
        ["foo"],
        arg
      )
    );

    expect(callback).toBeCalledTimes(1);
    arg = "bar";

    await waitForExpect(() => {
      expect(callback).toBeCalledTimes(2);
    });
  });
});
