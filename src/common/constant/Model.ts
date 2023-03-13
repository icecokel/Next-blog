import { BlogVO } from "../../../store/modules/blog";
import { MenuVO } from "../../../store/modules/menu";
import { UserVO } from "../../../store/modules/user";

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

export interface FirebaseResponseVO extends BlogVO {
  user: UserVO;
  menu: MenuVO[];
  postsCount: number;
}
