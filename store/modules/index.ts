import { AnyAction, CombinedState, combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import blog, { Blog } from "./blog";

const rootReducer = (
  state: IndexState | undefined,
  action: AnyAction
): CombinedState<IndexState> => {
  switch (action.type) {
    // 서버 사이드 데이터를 클라이언트 사이드 Store에 통합.
    case HYDRATE:
      return { ...action.payload };
    default: {
      const combineReducer = combineReducers({
        blog,
      });
      return combineReducer(state as any, action as any);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

export interface IndexState {
  blog: Blog;
}
