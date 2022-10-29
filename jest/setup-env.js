import { server } from "./mock_server";

beforeAll(() => {
  window.happyDOM.setURL("http://localhost");
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
