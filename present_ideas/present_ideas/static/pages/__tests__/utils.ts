import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

export const mockRoute = { params: {} };
export const getVueWithVuex = () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  return localVue;
};
