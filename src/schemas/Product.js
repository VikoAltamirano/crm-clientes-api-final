const {Schema, model} = require("mongoose")

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 5.50,
        required: true,
       
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Product', ProductSchema, "Products")