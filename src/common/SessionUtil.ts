import CryptoUtil from "./CryptoUtil";

const SessionUtil = {
  setSession: (key: string, value: string | object) => {
    window.sessionStorage.setItem(key, CryptoUtil.encrypt(value));
  },

  getSession: (key: string) => {
    const encryptoText = window.sessionStorage.getItem(key);

    if (!encryptoText) {
      return undefined;
    }

    return CryptoUtil.decrypt(encryptoText);
  },

  removeSession: (key: string) => {
    window.sessionStorage.removeItem(key);
  },
};

export default SessionUtil;
