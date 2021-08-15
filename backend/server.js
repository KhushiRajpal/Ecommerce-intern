const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');
const api = process.env.API_URL;

app.use(express.json());
app.use(morgan('tiny'));


app.get(`${api}/products` , (req, res) => {
	const product = {
		id: 1,
		name: 'Tresemme shampoo',
		image: 'someurl',
	}
	res.send(product);
})

app.post(`${api}/products` , (req, res) => {
	const newProduct = req.body;
	console.log(newProduct);
	res.send(newProduct);
})

mongoose.connect(process.env.CONNECTIONSTRING,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: 'eShop-database'
})
.then(() =>{
	console.log('Database connection is ready...')
})
.catch(()=>{
	console.log(err);
})
app.listen(3000, () => {
	console.log(api);
	console.log(`Serve at http://localhost:3000`);
});