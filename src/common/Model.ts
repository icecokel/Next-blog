export interface NewPostVO {
  title: string;
  contents: string | undefined;
  registDate: number;
}

export interface PostVO extends NewPostVO {
  id: string;
  menuId: string;
  hits: string;
  registId: string;
}
