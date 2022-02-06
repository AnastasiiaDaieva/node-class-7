const jwt = require('jsonwebtoken');

const SECRET_KEY = 'fndjgnfjjnkm';

const payload = {
  id: '61fea645019664e0829ab808',
};

const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
// console.log(token);
const decodeToken = jwt.decode(token);

// console.log(decodeToken);

try {
  const result = jwt.verify(token, SECRET_KEY);
  //   console.log(result);
} catch (error) {
  console.log(error.message);
}
