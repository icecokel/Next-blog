import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";

const useAuth = () => {
  const user = useSelector((state: RootState) => state.user);
  const { data } = useSession();
  return {
    isOwner: user.googleEmail === data?.user?.email,
  };
};

export default useAuth;
