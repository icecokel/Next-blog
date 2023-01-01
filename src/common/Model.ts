export interface NewPostVO {
  title: string;
  contents: string;
  registDate: Number;
}

export interface PostVO extends NewPostVO {
  id: string;
  menuId: string;
  hits: string;
  registName: string;
}
