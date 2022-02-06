/* eslint-disable no-useless-escape */
const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema(
  {
    email: { type: String, required: true, unique: true, match: emailRegEx },
    password: { type: String, required: true, minlength: 6 },
  },
  { versionKey: false, timestamps: true },
);

const User = model('user', userSchema);

const registerJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegEx).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  register: registerJoiSchema,
};

module.exports = { User, schemas };
