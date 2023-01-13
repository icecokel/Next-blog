/**
 * user 리덕스 모듈
 *
 * @description user 전역 상태 관리
 * @author LeeSangmin
 * @since 2022/02/23
 */

// 액션 타입 선언
export const SET_USER = "user/SET_USER" as const;

// 액션 함수 선언
export const setUser = (user: UserVO) => ({
  type: SET_USER,
  payload: user,
});

// 액센 객체들에 대한 타입 선언
export type UserAction = ReturnType<typeof setUser>;

// 유저정보 타입
export type UserVO = {
  email: string;
  id: string;
  introduction: string;
  nickname: string;
  profileImgPath: string;
  googleEmail?: string;
};

// 초기 값 선언
const initialState: UserVO = {
  email: "",
  id: "",
  introduction: "",
  nickname: "",
  profileImgPath: "",
};

// 리듀서 반환
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: UserVO = initialState, action: UserAction) => {
  switch (action.type) {
    case SET_USER:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
