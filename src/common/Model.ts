export interface NewPostVo {
  title: string;
  contents: string;
  registDate: Date;
}

export interface PostVo extends NewPostVo {
  boardNo: string;
  categoryNo: string;
  hits: string;
  registId: string;
}
