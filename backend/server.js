const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const productsRouter = require('./routers/products');

// importing my env variables
require('dotenv/config');
const api = process.env.API_URL;

//middleware I'm using
app.use(express.json());
app.use(morgan('tiny'));

//routers

app.use(`${api}/products`, productsRouter);


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