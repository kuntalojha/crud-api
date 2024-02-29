import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';

const router = express.Router();

// get the data from database
router.get('/', getProducts);
router.get('/:id', getProduct);

// post the data or insert data to the database
router.post('/', createProduct);

// update a product from the database
router.put('/:id', updateProduct);

// delete a product from the database
router.delete('/:id', deleteProduct);

export default router;
