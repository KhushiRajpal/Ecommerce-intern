const {Catalog} = require('../models/catalog');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{
	const catalogList = await catalogList.find();

	if(!catalogList) {
		res.status(500).json({success: false})
	}
	res.send(catalogList);
})

router.post('/', async(req,res) =>{
	let catalog = new Catalog(
	{
		name: req.body.name,
		icon: req.body.icon,
		color: req.body.color
	})
	catalog = await catalog.save();
	if(!catalog)
	{
	return res.status(404).send('the catalog cannot be created!')
	}
	res.send(catalog);
})

module.exports =router;
