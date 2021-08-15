const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const productsRouter = require('./routers/products.js');
const catalogRouter = require('./routers/catalogs.js');
const userRouter = require('./routers/users.js');
const ordersRoutes = require('./routers/orders');
// importing my env variables
require('dotenv/config');
const api = process.env.API_URL;

//middleware I'm using
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler)

//routers

app.use(`${api}/products`, productsRouter);
app.use(`${api}/catalogs`, catalogRouter);
app.use(`${api}/user`, userRouter);
app.use(`${api}/orders`, ordersRoutes);


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