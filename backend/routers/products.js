const { Product} = require('../models/product');
const { Catalog } = require('../models/catalog');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/` , async (req, res) => {
	const productList = await Product.find().populate('catalog');   
	if(!productList){
		res.status(500).json({success: false});
	}
	res.send(productList);
})

router.post(`/`,  async (req, res) =>{
    const catalog = await Catalog.findById(req.body.catalog).populate('catalog');
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


router.put('/:id',async (req, res)=> {
	if(! mongoose.isValidObjectId(req.params.id)) {
		return res.status(400).send('Invalid Product Id')
	 }
    const catalog = await Catalog.findById(req.body.catalog);
    if(!catalog)
	{
		return res.status(400).send('Invalid Catalog! Enter the correct one')
	} 
    const product = await Product.findByIdAndUpdate(
		req.params.id,
		{ 
			name: req.body.name,
			description: req.body.description,
			brand: req.body.brand,
			price: req.body.price,
			catalog: req.body.catalog,
        },
        { new: true}
    )

    if(!product)
	{
    return res.status(500).send('the product cannot be updated!')
	}

    res.send(product);
})

router.delete('/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports = router;

