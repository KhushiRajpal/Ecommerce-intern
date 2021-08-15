const mongoose = require('mongoose');

const catalogSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    color: { 
        type: String,
    }
})


catalogSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

catalogSchema.set('toJSON', {
    virtuals: true,
});

exports.Catalog = mongoose.model('Catalog', categorySchema);