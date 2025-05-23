const orderModel = require("../../models/orders/order")
const userModel = require("../../models/user")
const productModel = require("../../models/products/products")
const categoryModel = require("../../models/categories/category")

module.exports.dashboardData = async (req, res) => {

    try{

        // counts 
        const ordersCount = await orderModel.find().count()
        const usersCount = await userModel.find().count()
        const productsCount = await productModel.find().count()
        const categoriesCount = await categoryModel.find().count()

        return res.json({
            success : true,
            message : "dashboard data",
            data : {
                ordersCount,
                usersCount,
                productsCount,
                categoriesCount
            }
        })

    }catch(error){
        res.send(error.message)
    }

}

module.exports.getAllUsers = async (req, res) => {

    try{
        const users = await userModel.find()
            .select("-password -token")

        return res.json({
            success : true,
            message : "all users",
            data : users
        })

    }catch(error){
        res.send(error.message)
    }

}

module.exports.updateUsers = async (req, res) => {

    try{
        const {id,name,email,userType} = req.body;

        const user = await userModel.findOne({_id : id});
        if(!user){
            return res.json({
                success : false,
                status : 400,
                message : "user does not exist"
            })
        }
        const updatedUser = await categoryModel.findOneAndUpdate({_id : id}, req.body, {new :true})
        return res.json({
            success : true,
            status : 200,  
            message : "user update successfully!",
            data : updatedUser
        })

    }catch(error){
        res.send(error.message)
    }

}

module.exports.deleteUsers = async (req, res) => {

    try{
        const {id} = req.body;

        const user = await userModel.findOne({_id : id});
        if(!user){
            return res.json({
                success : false,
                status : 400,
                message : "user does not exist"
            })
        }
        const deleteUser = await categoryModel.findOneAndDelete({_id : id})
        return res.json({
            success : true,
            status : 200,  
            message : "user deleted successfully!",
            data : deleteUser
        })

    }catch(error){
        res.send(error.message)
    }

}
