import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost/api/their_list/:name", (req, res, context) => {
    return res(context.json({ presents: [] }));
  }),
  rest.get("http://localhost/api/my_list/:name", (req, res, context) => {
    return res(context.json({ presents: [] }));
  }),
];
