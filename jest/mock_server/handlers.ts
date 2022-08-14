import { rest } from "msw";

export const handlers = [
  rest.get("/api/their_list/:name", (req, res, context) => {
    return res(context.json({ presents: [] }));
  }),
  rest.get("/api/my_list/:name", (req, res, context) => {
    return res(context.json({ presents: [] }));
  }),
];
