const { Product} = require('../models/product');
const { Catalog } = require('../models/catalog');
const express = require('express');
const router = express.Router();

router.get(`/` , async (req, res) => {
	const productList = await Product.find().select('name price -_id');
	if(!productList){
		res.status(500).json({success: false});
	}
	res.send(productList);
})

router.post(`/`,  async (req, res) =>{
    const catalog = await Catalog.findById(req.body.catalog);
    if(!catalog)
	{
		return res.status(400).send('Invalid Catalog! Enter the correct one')
	} 

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        price: req.body.price,
        catalog: req.body.catalog,
    })

    product = await product.save();

    if(!product) 
	{
    return res.status(500).send('The product cannot be created')
	}
    res.send(product);
})

module.exports = router;

