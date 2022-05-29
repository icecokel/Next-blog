export interface NewPostVO {
  title: string;
  contents: string;
  registDate: Date;
}

export interface PostVO extends NewPostVO {
  boardNo: string;
  categoryNo: string;
  hits: string;
  registId: string;
}
