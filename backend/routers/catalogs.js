const {Catalog} = require('../models/catalog');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{
	const catalogList = await Catalog.find();

	if(!catalogList) {
		res.status(500).json({success: false})
	}
	res.status(200).send(catalogList);
})

//adding a get by id for a catalog
router.get('/:id' , async(req,res) =>{
	const catalog = await Catalog.findById(req.params.id);
	if(!catalog)
	{
	return res.status(404).send('the catalog with given id was not found')
	}
	res.status(200).send(catalog);


})

//doing it via async 
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


router.put('/:id',async (req, res)=> {
    const catalog = await Catalog.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        { new: true}
    )

    if(!catalog)
	{
    return res.status(400).send('the catalog was not updated')
	}
    res.send(catalog);
})

//doing it via promise
router.delete('/:id', (req, res) =>{
	Catalog.findByIdAndRemove(req.params.id).then(catalog =>{
		if(catalog) {
			return res.status(200).json({success: true, message: 'the catalog was removed'})
		}
			else {
				return res.status(404).json({success: false, message: 'the catalog was not removed'})
			}
		}).catch(err=>{
			return res.status(400).json({success: false, error:err})
		})

	})

module.exports =router;
