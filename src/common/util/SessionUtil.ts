import EncryptUtil from "./EncryptUtil";

const SessionUtil = {
  setSession: (key: string, value: string | object) => {
    window.sessionStorage.setItem(key, EncryptUtil.encrypt(value));
  },

  getSession: (key: string): any | undefined => {
    const encryptoText = window.sessionStorage.getItem(key);

    if (!encryptoText) {
      return undefined;
    }

    return EncryptUtil.decrypt(encryptoText);
  },

  removeSession: (key: string): void => {
    window.sessionStorage.removeItem(key);
  },
};

export default SessionUtil;
