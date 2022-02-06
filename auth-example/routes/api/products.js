const express = require('express');
const CreateError = require('http-errors');

const { Product, schemas } = require('../../models/product');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await Product.find({}, '-createdAt -updatedAt');
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Product.findById(id);
    if (!result) {
      throw new CreateError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404;
    }
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }
    const result = await Product.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400;
    }
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }
    const { id } = req.params;
    const result = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw new CreateError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/active', async (req, res, next) => {
  try {
    const { error } = schemas.updateFavofite.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }
    const { id } = req.params;
    const result = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw new CreateError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Product.findByIdAndDelete(id);
    // findByIdAndDelete => findOneAndDelete
    // findByIdAndRemove => findAndModify
    if (!result) {
      throw new CreateError(404, 'Not found');
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
