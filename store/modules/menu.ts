/**
 * menu 리덕스 모듈
 *
 * @description menu 전역 상태 관리
 * @author LeeSangmin
 * @since 2023/01/30
 */

// 액션 타입 선언
export const SET_MENU = "menu/SET_MENU" as const;

// 액션 함수 선언
export const setMenu = (menu: MenuVO[]) => ({
  type: SET_MENU,
  payload: menu,
});

// 액센 객체들에 대한 타입 선언
export type MenuAction = ReturnType<typeof setMenu>;

// 카테고리 타입
export type MenuVO = {
  count: number;
  id: string;
  name: string;
  index: number;
};

// 초기 값 선언
// 배열로 선언
const initialState: MenuVO[] = [];

// 리듀서 반환
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: MenuVO[] = initialState, action: MenuAction) => {
  switch (action.type) {
    case SET_MENU:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
