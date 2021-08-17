const {Order} = require('../models/order');
const express = require('express');
const { OrderItem } = require('../models/order-item');
const router = express.Router();

router.get(`/`, async (req, res) =>
{
	//sorting orders recieved from newest to oldest
	const orderList = await Order.find().populate('user' , 'name').sort({'dateOrdered' : -1});
	if(!orderList)
	{
		res.status(500).send("Orders not found");
	}
	res.send(orderList);
})

router.get(`/:id`, async (req, res) =>
{
	//filtering here by catalog so we can link each order back to the seller 
	const order1 = await Order.findById(req.params.id)
	.populate('user' , 'name')
	.populate({ path: 'orderItems', populate: {path: 'product', populate: 'catalog'}})

	if(!order1)
	{
		res.status(500).send("Orders not found");
	}
	res.send(order1);
})

router.post('/', async (req, res) =>
{
	const orderItemids = Promise.all(req.body.orderItems.map(async orderItem =>{
		let newOrderItem = new OrderItem({
			quantity: orderItem.quantity,
			product: orderItem.product
		})
		newOrderItem = await newOrderItem.save();
		return newOrderItem._id;

	}))

	const orderItemsRes = await orderItemids;
	const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b) => a +b , 0);
	

	let order = new Order({
		orderItems: orderItemsRes,
		shippingAddress1: req.body.shippingAddress1,
		shippingAddress2: req.body.shippingAddress2,
		city: req.body.city,
		zip: req.body.zip,
		country: req.body.country,
		phone: req.body.phone,
		status: req.body.status,
		totalPrice: totalPrice,
		user: req.body.user,
		dateOrdered: req.body.dateOrdered,
	})
	order = await order.save();
	if(!order)
	{
		res.status(500).send("Order could not be created");
	}
	res.send(order);
})
router.put('/:id', async(req, res) =>{
	const order = await Order.findByIdAndUpdate(
		req.params.id,
		{
			status: req.body.status,
		},
		{ new:true }

	)
	if(!order)
	{
	return res.status(400).send('the order could not be updated') 
	}
	res.send(order);
})
router.delete('/:id' , (req,res) =>{
	Order.findByIdAndRemove(req.params.id).then(async order =>{
		if(order) {
			await order.orderItems.map(async orderItem =>{
				await OrderItem.findByIdAndRemove(orderItem)
			})
			  return res.status(200).json({success: true, message: 'order deleted successfully'})
			} else{
				return res.status(404).json({success: false, message: "order not deleted successfully"})
			}

			}).catch(err=>{
				return res.status(500).json({success:false, error:err})

			})
		})

module.exports = router;