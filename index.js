import express from 'express';
import mongoose from 'mongoose';

import Product from './models/product.model.js';
const app = express();
const port = 3000;
// This is use for pass json data into express
app.use(express.json());

// This one is use for send data as a form url
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect('mongodb://127.0.0.1:27017/crud-api')
  .then(() => console.log('Connected to the database!'))
  .catch(() => {
    console.log('Connection faield!!!');
  });

app.get('/', (req, res) => {
  res.send('Hello from Node API ! ');
});

//  Add data to the database
app.post('/api/products', async (req, res) => {
  try {
    // console.log(req.body);
    // res.send(req.body);
    const product = await Product.create(req.body);
    res.status(200).json(product);
    // console.log(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product in the database using id
// We can use put or patch for update data in the database
app.put('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get ALL the data from database
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product by id from database
app.get('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a product form database using id

app.delete('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }

    res.status(200).json({ message: 'Product deleted successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// server listening at port 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
