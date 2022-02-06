const express = require('express');
const router = express.Router();
const { User, schemas } = require('../../models/user');
const CreateError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

router.post('/register', async (req, res, next) => {
  try {
    //   body review
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }

    const { email, password } = req.body;

    //   checking whether the email is already used for this db
    const user = await User.findOne({ email });
    if (user) {
      throw new CreateError(409, 'Email is in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.create({ email, password: hashPassword });
    res.status(201).json({ user: { email } });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new CreateError(401, 'Email not found');
    }
    const compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult) {
      throw new CreateError(401, 'Wrong password!');
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, user: { email } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
