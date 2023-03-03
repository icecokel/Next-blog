/**
 * clientState 리덕스 모듈
 *
 * @description clientState 전역 상태 관리
 * @author LeeSangmin
 * @since 2022/07/12
 */

// 액션 타입 선언
export const SET_ERROR_MODAL = "clientState/SET_ERROR_MODAL" as const;
export const SET_COMMON_MODAL = "clientState/SET_COMMON_MODAL" as const;

// 액션 함수 선언
export const setErrorModal = (error: ErrorModalVO) => ({
  type: SET_ERROR_MODAL,
  payload: error,
});
// 액션 함수 선언
export const setCommonModal = (common: CommonModalVO) => ({
  type: SET_COMMON_MODAL,
  payload: common,
});

// 액센 객체들에 대한 타입 선언
export type ClientStateAction = ReturnType<typeof setErrorModal | typeof setCommonModal>;

// 카테고리 타입
export type ClientStateVO = {
  modal: {
    error: ErrorModalVO;
    common: CommonModalVO;
  };
};

interface CommonModalVO {
  isShowing: boolean;
  title: string;
  text: string;
}

export interface ErrorModalVO {
  isShowing: boolean;
  title: string;
  error: string;
}
// 초기 값 선언
// 배열로 선언
const initialState: ClientStateVO = {
  modal: {
    error: {
      isShowing: false,
      title: "",
      error: "",
    },
    common: {
      isShowing: false,
      title: "",
      text: "",
    },
  },
};

// 리듀서 반환
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: ClientStateVO = initialState, action: ClientStateAction) => {
  switch (action.type) {
    case SET_ERROR_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          error: action.payload,
        },
      };
    case SET_COMMON_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          common: action.payload,
        },
      };

    default:
      return state;
  }
};
