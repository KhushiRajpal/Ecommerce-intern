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
    catalogs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalogs',
        required:true
    },
   
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});


exports.Product = mongoose.model('Product', productSchema);