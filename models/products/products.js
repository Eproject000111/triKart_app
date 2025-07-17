const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    title : {type: String, required: [true, 'Product name is required']}, // Name of the product. If missing, an error message "Product name is required" is thrown.
    image :  {type: String, default: null }, // URL of the main product image. Defaults to null if not provided.
    description : {type: String, required: [true, 'description required']}, // Detailed information about the product. Throws an error "description required" if missing.
    summary: { type: String, default: null }, //A short summary of the product, which can be used for quick previews or search results. Defaults to null.
    cover: { type: String, default: null }, // URL of the cover image for the product. Defaults to null.
    isFeatured: { type: Boolean, default: false }, // Marks a product as featured. Defaults to false. Indexed for quick lookups.
    categoryId : {type:mongoose.Schema.Types.ObjectId, ref:'categories'},

}, { timestamps : true })

module.exports = mongoose.model("product", productSchema)




/* const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"]
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"]
    },
    finalPrice: {
      type: Number,
      default: function() {
        return this.price - (this.price * this.discount) / 100;
      }
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    images: [{
      url: { type: String, required: true },
      alt: { type: String, default: "Product image" }
    }],
    variants: [{
      color: { type: String, trim: true },
      size: { type: String, trim: true },
      price: { type: Number, min: 0 },
      stock: { type: Number, min: 0, default: 0 }
    }],
    ratings: {
      average: { type: Number, min: 0, max: 5, default: 0 },
      count: { type: Number, default: 0 }
    },
    reviews: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: { type: String, trim: true },
      rating: { type: Number, min: 0, max: 5 },
      createdAt: { type: Date, default: Date.now }
    }],
    seo: {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
      keywords: [String]
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true
    }
  }, { timestamps: true }); */