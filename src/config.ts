const SECRET = process.env.REACT_APP_SECRET;
if(!SECRET) {
  throw new TypeError('SECRET is undefined');
}

export default { SECRET };