export interface NewPostVO {
  title: string;
  contents: string;
  registDate: number;
}

export interface PostVO extends NewPostVO {
  id: string;
  menuId: string;
  hits: string;
  registName: string;
}
