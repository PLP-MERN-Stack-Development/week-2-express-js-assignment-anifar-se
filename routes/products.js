const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const validateProducts = require('../middleware/validateProduct');
const { NotFoundError, ValidationError } = require('../middleware/errors');


let products = [
    { id: '1', name: 'Laptop', description: 'High-performance laptop with 16GB RAM', price: 1200, category: 'electronics', inStock: true },
    { id: '2', name: 'Smartphone', description: 'Latest model with 128GB storage', price: 800, category: 'electronics', inStock: true },
    { id: '3', name: 'Coffee Maker', description: 'Programmable coffee maker with timer', price: 50, category: 'kitchen', inStock: false }
];
router.get('/products', auth, (req, res) => {
    res.json(products);
});

// GET all products
router.get('/products', (req, res) => {
    res.json(products);
});

// GET products with filter and pagination
router.get('/products/filter', (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;
    let result = products;

    if (category) {
        result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    const start = (page - 1) * limit;
    const paginated = result.slice(start, start + parseInt(limit));

    res.json({
        page: parseInt(page),
        totalItems: result.length,
        items: paginated
    });
});

// GET search by name
router.get('/products/search', (req, res) => {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: 'Missing search term' });

    const result = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    res.json(result);
});

// GET category stats
router.get('/products/stats/category-count', (req, res) => {
    const categoryCount = {};
    for (const product of products) {
        categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    }
    res.json(categoryCount);
});

// POST new product
router.post('/products', validateProducts, (req, res) => {
    const newProduct = { id: uuidv4(), ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT update product
router.put('/products/:id', validateProducts, (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// DELETE product
router.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        products.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = router;

