import { MakeStore, createWrapper } from "next-redux-wrapper";
import { Middleware, StoreEnhancer, applyMiddleware, createStore } from "redux";
import rootReducer from "./modules";

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore: MakeStore<any> = () => {
  const store = createStore(rootReducer, {}, bindMiddleware([]));
  return store;
};

export const wrapper = createWrapper<any>(makeStore, { debug: true });
