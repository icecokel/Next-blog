const SessionUtil = {
  setSession: (key: string, value: string) => {
    window.sessionStorage.setItem(key, value);
  },

  getSession: (key: string) => {
    return window.sessionStorage.getItem(key);
  },

  removeSession: (key: string) => {
    window.sessionStorage.removeItem(key);
  },
};

export default SessionUtil;
