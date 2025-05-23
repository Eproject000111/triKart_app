const productModel = require("../../models/products/products");
const productAttributeModel = require("../../models/products/productsAttribute");
const productSkuModel = require("../../models/products/productsSkus");

/* Product APIs */

let addProduct = async (req, res) => {
    try{

        const {title, sku, price, quantity, image} = req.body;

        if(!title || !sku || !price) return res.send("Fields are empty")

        let product = new productModel(req.body)
        product.save()

        return res.json({
            success : true,
            message : "Product inserted successfully",
            data : product
        })

    }catch(error){
        return res.send(error.message)
    }
}

let getProducts = async (req, res) => {
    try{

        const products = await productModel.find().populate('category');
        const productsCount = await productModel.find().count();

        return res.json({
            success : true,
            status : 400,
            message : "list of all products",
            products,
            count : productsCount
        })

    }catch(error){
        return res.send(error.message)
    }
}


let updateProduct = async (req, res) => {
    try{

        const {title, sku, price, image} = req.body;
        const {id} = req.query;

        // check if product exist with the given product id
        const product = await productModel.findOne({_id : id})

        if(product){
            const updatedProduct = await productModel.findOneAndUpdate({_id : id}, req.body, {new :true})

            return res.json({
                success : true,
                status : 200,  
                message : "product updated successfully",
                data : updatedProduct
            })
        }else{
            
            return res.json({
                success : false,
                status : 400,
                message : "product does not exist"
            })

        }

    }catch(error){
        return res.send(error.message)
    }
}

let deleteProduct = async (req, res) => {
    try{

        const {id} = req.query;
        
        // check if product exist with the given product id
        const product = await productModel.findOneAndDelete({_id : id})
        if(!product){
            return res.json({
                success : false,
                message : "product does not exist",
            })
        }
        return res.json({
            success : true,
            message : "product deleted successfully",
        })

    }catch(error){
        return res.send(error.message)
    } 
}

let getAllProducts = async (req, res) => {
    try{

        // Search through title names
        var {search} = req.query
        if(!search) search = ""

        const products = await productModel.find({title:{'$regex' : search, '$options' : 'i'}})
            .populate("category")

        return res.json({
            success : true,
            status : 200,
            message : "list of products",
            data : products
        })

    }catch(error){
        return res.json({
            success : false,
            status : 400,
            message : error.message
        })
    }
}

/* Product Attribute APIs */
let addProductAttribute = async (req, res) => {
    try{

        /**
         * type:- enum -> size,color
         * value:- 
         *    Size -> Middum, Small, Large, Extra Large.
         *    color -> Red, Green etc.
        */

        const {type, value} = req.body;

        if(!type || !value) return res.send("Fields are empty")

        let productAttribute = new productAttributeModel(req.body)
        productAttribute.save()

        return res.json({
            success : true,
            message : "Item inserted successfully",
            data : productAttribute
        })

    }catch(error){
        return res.send(error.message)
    }
}

let getProductsAttribute = async (req, res) => {
    try{

        const productAttribute = await productAttributeModel.find();
        const productAttributeCount = await productAttributeModel.find().count();

        if(productAttribute){
            return res.status(200).json({
                success : true,
                message : "list of all products",
                products,
                count : productsCount
            })
        }

        return res.status(400).json({
            success : false,
            message : "Server Error"
        })


    }catch(error){
        return res.send(error.message)
    }
}

let updateProductAttribute = async (req, res) => {
    try{

        const {type, value, id} = req.body;

        // check if product exist with the given product id
        const productAttribute = await productAttributeModel.findOne({_id : id})

        if(productAttribute){
            let params = {
                type: type,
                value: value
            }
            const updatedProductAttribute = await productAttributeModel.findOneAndUpdate({_id : id}, params, {new :true})

            return res.json({
                success : true,
                status : 200,  
                message : "items updated successfully",
                data : updatedProductAttribute
            })
        }else{
            
            return res.json({
                success : false,
                status : 400,
                message : "product does not exist"
            })

        }

    }catch(error){
        return res.send(error.message)
    }
}

let deleteProductAttribute = async (req, res) => {
    try{

        const {id} = req.query;
        
        // check if product exist with the given product id
        const productAttribute = await productAttributeModel.findOneAndDelete({_id : id})
        if(!productAttribute){
            return res.json({
                success : false,
                message : "product does not exist",
            })
        }
        return res.json({
            success : true,
            message : "item deleted successfully",
        })

    }catch(error){
        return res.send(error.message)
    } 
}

/* Products SKU APIs */
let addProductSku = async (req, res) => {
    try{

        const {productId, price, quantity, productSize, productColor} = req.body;

        if(!productId || !price || !quantity || !productSize || !productColor) return res.send("Fields are empty")

        let productSku = new productSkuModel(req.body)
        productSku.save()

        return res.json({
            success : true,
            message : "Item inserted successfully",
            data : productSku
        })

    }catch(error){
        return res.send(error.message)
    }
}

let getProductsSku = async (req, res) => {
    try{

        // const productSku = await productSkuModel.find();
        const productSku = await productSkuModel.find().populate('productsAttribute');
        const productSkuCount = await productSkuModel.find().count();

        if(productSku){
            return res.status(200).json({
                success : true,
                message : "list of all products",
                productSku,
                count : productSkuCount
            })
        }

        return res.status(400).json({
            success : false,
            message : "Server Error"
        })


    }catch(error){
        return res.send(error.message)
    }
}

let updateProductSku = async (req, res) => {
    try{
        // const {productId, price, quantity, productSize, productColor} = req.body;

        // check if product exist with the given product id
        const productSku = await productSkuModel.findOne({_id : req.body.id})

        if(productSku){
            const updatedProductSku = await productSkuModel.findOneAndUpdate({_id : id}, params, {new :true})

            return res.json({
                success : true,
                status : 200,  
                message : "items updated successfully",
                data : updatedProductSku
            })
        }else{
            
            return res.json({
                success : false,
                status : 400,
                message : "product does not exist"
            })

        }

    }catch(error){
        return res.send(error.message)
    }
}

let deleteProductSku = async (req, res) => {
    try{

        const {id} = req.query;
        
        // check if product exist with the given product id
        const productSku = await productSkuModel.findOneAndDelete({_id : id})
        if(!productSku){
            return res.json({
                success : false,
                message : "product does not exist",
            })
        }
        return res.json({
            success : true,
            message : "item deleted successfully",
        })

    }catch(error){
        return res.send(error.message)
    } 
}


module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getAllProducts,

    addProductAttribute,
    getProductsAttribute,
    updateProductAttribute,
    deleteProductAttribute,

    addProductSku,
    getProductsSku,
    updateProductSku,
    deleteProductSku
}

