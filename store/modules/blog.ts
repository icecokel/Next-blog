/**
 * blog 리덕스 모듈
 *
 * @description blog 전역 상태 관리
 * @author LeeSangmin
 * @since 2022/02/21
 */

// 액션 타입 선언
export const SET_BLOG = "blog/SET_BLOG" as const;

// 액션 함수 선언
export const setBlog = (blog: BlogVO) => ({
  type: SET_BLOG,
  payload: blog,
});

// 액센 객체들에 대한 타입 선언
export type BlogAction = ReturnType<typeof setBlog>;

// 블로그 타입
export type BlogVO = {
  url: string;
  description: string;
  faviconPath: string;
  id: string;
  userId: string;
  githubAddress: string;
  postsCount: number;
};

// 초기 값 선언
const initialState: BlogVO = {
  url: "",
  description: "",
  faviconPath: "",
  id: "",
  userId: "",
  githubAddress: "",
  postsCount: 0,
};

// 리듀서 반환
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: BlogVO = initialState, action: BlogAction) => {
  switch (action.type) {
    case SET_BLOG:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
