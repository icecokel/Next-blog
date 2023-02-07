import React, { useEffect } from "react";
import MainCp from "../MainCp";
import { BlogVO } from "../../../store/modules/blog";
import { UserVO } from "../../../store/modules/user";
import { MenuVO } from "../../../store/modules/menu";
import { useDispatch } from "react-redux";
import { setBlog } from "../../../store/modules/blog";
import { setMenu } from "../../../store/modules/menu";
import { setUser } from "../../../store/modules/user";

const MainCt = () => {
  return <MainCp />;
};

export default MainCt;
