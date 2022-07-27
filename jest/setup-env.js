// test/setup-env.js
// add this to your setupFilesAfterEnv config in jest so it's imported for every test file
import fetch, { Headers, Request, Response } from "node-fetch";
import { TextDecoder as UtilTextDecoder } from "util";
import { server } from "../mock_server";

if (!globalThis.fetch) {
  // @ts-ignore
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  // @ts-ignore
  globalThis.Request = Request;
  // @ts-ignore
  globalThis.Response = Response;
}

if (!globalThis.TextDecoder) {
  globalThis.TextDecoder = UtilTextDecoder;
}

beforeAll(() => server.listen());
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
