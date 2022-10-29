import {
  render as testingLibraryRender,
  RenderOptions,
} from "@testing-library/vue";
import linkify from "vue-linkify";
import { createMemoryHistory, createRouter } from "vue-router";
import routes from "../present_ideas/present_ideas/static/router/routes";
import getStore from "../present_ideas/present_ideas/static/store";

const mockRouter = createRouter({ routes, history: createMemoryHistory() });

export const render = async (component, options = {}) => {
  const store = getStore();
  const defaultRenderOptions: RenderOptions = {
    global: {
      plugins: [store, mockRouter],
      directives: { linkified: linkify },
    },
  };
  const renderOptionsWithDefaults = { ...defaultRenderOptions, ...options };

  const result = testingLibraryRender(component, renderOptionsWithDefaults);

  return result;
};
