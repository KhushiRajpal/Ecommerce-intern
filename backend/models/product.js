const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        default: ''
    },
    price : {
        type: Number,
        default:0
    },
    catalog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalog',
        required:true
    },
   
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})



exports.Product = mongoose.model('Product', productSchema);