/**
 * clientState 리덕스 모듈
 *
 * @description clientState 전역 상태 관리
 * @author LeeSangmin
 * @since 2022/07/12
 */

// 액션 타입 선언
export const SET_ERROR = "clientState/SET_ERROR" as const;

// 액션 함수 선언
export const setError = (error: ErrorVO) => ({
  type: SET_ERROR,
  payload: error,
});

// 액센 객체들에 대한 타입 선언
export type ClientStateAction = ReturnType<typeof setError>;

// 카테고리 타입
export type ClientStateVO = {
  error: ErrorVO;
};

export interface ErrorVO {
  isShowing: boolean;
  title: string;
  error: string;
}
// 초기 값 선언
// 배열로 선언
const initialState: ClientStateVO = {
  error: {
    isShowing: false,
    title: "",
    error: "",
  },
};

// 리듀서 반환
// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state: ClientStateVO = initialState,
  action: ClientStateAction
) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
