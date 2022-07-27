import { render as testingLibraryRender, type RenderOptions } from "@testing-library/vue";
import { createLocalVue } from "@vue/test-utils";
import type Vue from "vue";
import Vuex from "vuex";
// @ts-ignore
import getStore from "../../store";

const getVueAndStore = (): [typeof Vue, ReturnType<typeof getStore>]  => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = getStore();
  return [localVue, store];
};

export const render: typeof testingLibraryRender = (component, options = {}, ...rest) => {
  const mockRoute = { params: {} };
  const [localVue, storeProperlyTyped] = getVueAndStore();
  // Needs it as any for some reason
  const store = storeProperlyTyped as any;
  const defaultRenderOptions: RenderOptions<Vue, typeof store> = { localVue, store, mocks: { $route: mockRoute } };
  const renderOptionsWithDefaults = { ...defaultRenderOptions, ...options }
  return testingLibraryRender(component, renderOptionsWithDefaults, ...rest);
};
