import { useDispatch, useSelector } from "react-redux";
import BaseModal from "./BaseModal";
import ErrorLabel from "./ErrorLabel";
import { RootState } from "../../../store/modules";
import { setErrorModal } from "../../../store/modules/clientState";

const ErrorModal = () => {
  const {
    modal: {
      error: { error, isShowing, title },
    },
  } = useSelector((state: RootState) => state.clientState);
  const dispatch = useDispatch();
  const handleClickErrorClose = () => {
    dispatch(
      setErrorModal({
        isShowing: false,
        error,
        title,
      })
    );
  };

  return (
    <BaseModal title={title} isOpen={isShowing} setIsOpen={handleClickErrorClose}>
      <ErrorLabel text={error} />
    </BaseModal>
  );
};

export default ErrorModal;
