import jwt from 'jsonwebtoken';


const generateToken = (id) => {
  return jwt.sign({ id }, "abc123", {
    expiresIn: '30d'},{algorithm:'RSA256'}
  );
};

export default generateToken;
