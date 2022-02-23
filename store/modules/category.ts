/**
 * category 리덕스 모듈
 *
 * @description category 전역 상태 관리
 * @author LeeSangmin
 * @since 2022/02/23
 */

// 액션 타입 선언
export const SET_CATEGORY = "category/SET_CATEGORY" as const;

// 액션 함수 선언
export const setCategory = (category: Array<Category>) => ({
  type: SET_CATEGORY,
  payload: category,
});

// 액센 객체들에 대한 타입 선언
export type CategoryAction = ReturnType<typeof setCategory>;

// 카테고리 타입
export type Category = {
  categoryNo: string;
  categoryName: string;
  groupNo: string;
  groupOrder: string;
  depth: string;
};

// 초기 값 선언
// 배열로 선언
const initialState: Array<Category> = [];

// 리듀서 반환
// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state: Array<Category> = initialState,
  action: CategoryAction
) => {
  switch (action.type) {
    case SET_CATEGORY:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
