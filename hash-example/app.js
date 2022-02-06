const bcrypt = require('bcryptjs');

const password = '123456';

const genPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const result = await bcrypt.compare('7', hashPassword);
  console.log(result);
};

genPassword(password);
