const categoryModel = require("../../models/categories/category");

let addCategory = async (req, res) => {
    try{

        const {name, description, parentId} = req.body;

        if(!name) return res.send("Somethings went wrong!");

        let category = new categoryModel(req.body)
        category.save()

        if(parentId){
            await categoryModel.findByIdAndUpdate(parentId,{$push: { subCategories: category._id.toString()}})
        }

        return res.json({
            success : true,
            message : "category inserted successfully",
            data : category
        })

    }catch(error){
        return res.send(error.message)
    }
}

let getCategories = async (req, res) => {
    try{

        const categories = await categoryModel.find().populate({
            path: 'subCategories',
            populate: {
                path: 'subCategories'
            }
        }).exec();

        return res.status(200).json({
            success : true,
            message : "list of all categories",
            data: categories,
            count : categories.length
        })

    }catch(error){
        return res.send(error.message)
    }
}

let updateCategory = async (req, res) => {
    try{
        const {title, description, image, id} = req.body;
        
        // check if product exist with the given product id
        const category = await categoryModel.findOne({_id : id})

        if(category){
            const updatedCategory = await categoryModel.findOneAndUpdate({_id : id}, req.body, {new :true})

            return res.json({
                success : true,
                status : 200,  
                message : "category updated successfully",
                data : updatedCategory
            })
        }
        else{

            return res.json({
                success : false,
                status : 400,
                message : "category does not exist"
            })

        }

    }catch(error){
        return res.send(error.message)
    }
}

let deleteCategory = async (req, res) => {
    try{

        const {id} = req.query;
        
        // check if product exist with the given product id
        const category = await categoryModel.findOneAndDelete({_id : id})
        if(!category){
            return res.json({
                success : false,
                message : "category does not exist",
            })
        }
        return res.json({
            success : true,
            message : "category deleted successfully",
        })

    }catch(error){
        return res.send(error.message)
    } 
}

module.exports = {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory
}





