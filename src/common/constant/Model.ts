export interface NewPostVO {
  title: string;
  contents: string | undefined;
  registDate: number;
  menuId: string;
}

export interface PostVO extends NewPostVO {
  id: string;
  hits: string;
  registId: string;
}
