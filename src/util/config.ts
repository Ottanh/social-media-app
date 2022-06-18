let token = localStorage.getItem('sma-user-token');
const setHeaderToken = (newToken: string) => {
  token = newToken;
};

export default { token, setHeaderToken };