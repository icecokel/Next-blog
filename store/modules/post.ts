import { NewPostVO } from "../../src/common/Model";
/**
 * post 리덕스 모듈
 *
 * @description post 전역 상태 관리
 * @author LeeSangmin
 * @since 2022/02/21
 */

// 액션 타입 선언
export const SET_POST = "post/SET_POST" as const;

// 액션 함수 선언
export const setPost = (post: NewPostVO) => ({
  type: SET_POST,
  payload: post,
});

// 액센 객체들에 대한 타입 선언
export type PostAction = ReturnType<typeof setPost>;

// 초기 값 선언
const initialState: NewPostVO = {
  title: "",
  contents: "",
  registDate: new Date().getTime(),
  menuId: "",
};

// 리듀서 반환
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: NewPostVO = initialState, action: PostAction) => {
  switch (action.type) {
    case SET_POST:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
