const categoryModel = require("../../models/categories/category");
const payloadHandler = require("../../helpers/payloadHandler");
const _ = require('lodash');

let addCategory = async (req, res) => {
    let fieldHandle = {
        'name': req.body['name']
    }

    let isPayloadEmpty = payloadHandler(fieldHandle);

    if(isPayloadEmpty['isNull']){

        delete isPayloadEmpty['isNull'];
        
        return res.json({
            success: false,
            msg: 'Something went wrong',
            data: null,
            errorDesc: isPayloadEmpty
        })
    }

    try{
        let category = new categoryModel(req.body);

        await category.save();

        const {parentId} = req.body;

        if(parentId){
            await categoryModel.findByIdAndUpdate(parentId,{$push: { subCategories: category._id.toString()}})
        }

        return res.json({
            success : true,
            msg : "successfull",
            data : category
        })

    }catch(error){
        return res.status(500).json({
			success : false,
			msg: error.message,
		});
    }
}

let getCategories = async (req, res) => {

    let categories = [];
    let totalCount = 0;
    let page = 1;
    let limit = 10;
    let skip = (page - 1) * limit;
    
    
    try{
        if(req.body['filters']){

            let {
                    pageIndex, 
                    pageSize, 
                    sortBy, 
                    sortOrder, 
                    ...filterData
                } = req.body['filters'];

            /* -----> pagination<--------  */
            page = parseInt(pageIndex) || 1; // Default to page 1
            limit = parseInt(pageSize) || 10; // Default to 10 items per page
            skip = (page - 1) * limit;

            /* -----> Search Filters <-------- */
            let searchFilterData = filterData || {};
            if(filterData['name']){
                searchFilterData['name'] = {$regex : filterData['name'], $options: 'i'}
            }

            /* -----> Sorting Filters <-------- */
            let sortOptions = {};
            if (sortBy) {
              sortOptions[sortBy.trim()] = sortOrder === 'desc' ? -1 : 1;
            }


            if(parseInt(pageIndex) && parseInt(pageSize)){
    
                categories = await categoryModel.find(searchFilterData)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit)
                .populate({
                    path: 'subCategories',
                    populate: {
                        path: 'subCategories'
                    }
                }).exec();
    
                totalCount = await categoryModel.countDocuments();
            }
        }
        else{
            categories = await categoryModel.find()
            .populate({
                path: 'subCategories',
                populate: {
                    path: 'subCategories'
                }
            }).exec();
        }

        return res.status(200).json({
            success : true,
            msg : "success",
            records:{
                pagination:{
                    totalRecords: totalCount,
                    totalPages: Math.ceil(totalCount / limit),
                    pageIndex: page,
                    pageSize: limit
                },
                data: categories
            }
        })

    }catch(error){
        return res.status(200).json({
            success : true,
            msg : error.message
        })
    }
}

let getSubCategoriesByParentCategoryId = async (req, res) => {
    let fieldHandle = {
        'parentCatgId': req.body['categoryId']
    }

    let isPayloadEmpty = payloadHandler(fieldHandle);

    if(isPayloadEmpty['isNull']){

        delete isPayloadEmpty['isNull'];
        
        return res.json({
            success: false,
            msg: 'Something went wrong',
            data: null,
            errorDesc: isPayloadEmpty
        })
    }
    try{

        let {categoryId} = req.body;

        const categories = await categoryModel.find({"parentId":categoryId});

        return res.status(200).json({
            success : true,
            msg : "successfull",
            data: categories,
            count : categories.length
        })

    }catch(error){
        return res.status(200).json({
            success : true,
            msg : error.message
        })
    }
}

let getCategoryBySlug = async (req, res) => {
    let fieldHandle = {
        'slug': req.body['slug']
    }

    let isPayloadEmpty = payloadHandler(fieldHandle);

    if(isPayloadEmpty['isNull']){

        delete isPayloadEmpty['isNull'];
        
        return res.json({
            success: false,
            msg: 'Something went wrong',
            data: null,
            errorDesc: isPayloadEmpty
        })
    }
    try{

        let {slug} = req.body;

        const categories = await categoryModel.find(
            {
                slug: { $regex: slug, $options: "i" }
            }
        );

        return res.status(200).json({
            success : true,
            msg : "successfull",
            data: categories,
            count : categories.length
        })

    }catch(error){
        return res.status(200).json({
            success : true,
            msg : error.message
        })
    }
}

let getCategoryById = async (req, res) => {
    let fieldHandle = {
        'categoryId': req.body['categoryId']
    }

    let isPayloadEmpty = payloadHandler(fieldHandle);

    if(isPayloadEmpty['isNull']){

        delete isPayloadEmpty['isNull'];
        
        return res.json({
            success: false,
            msg: 'Something went wrong',
            data: null,
            errorDesc: isPayloadEmpty
        })
    }
    try{

        let {categoryId} = req.body;

        const categories = await categoryModel.find({"_id":categoryId});

        return res.status(200).json({
            success : true,
            msg : "successfull",
            data: categories
        })

    }catch(error){
        return res.status(200).json({
            success : true,
            msg : error.message
        })
    }
}



let updateCategory = async (req, res) => {
    let fieldHandle = {
        'id': req.body['id']
    }

    let isPayloadEmpty = payloadHandler(fieldHandle);

    if(isPayloadEmpty['isNull']){

        delete isPayloadEmpty['isNull'];
        
        return res.json({
            success: false,
            msg: 'Something went wrong',
            data: null,
            errorDesc: isPayloadEmpty
        })
    }
    try{
        const {id} = req.body;
        
        const updatedCategoryInfo = await categoryModel.findOneAndUpdate({_id : id}, req.body, {new :true});

        if(updatedCategoryInfo){

            return res.status(200).json({
                success : true, 
                msg : "category updated successfully",
                actCode:null,
                data : updatedCategoryInfo
            })
        }
        else{

            return res.status(500).json({
                success : false,
                actCode:null,
                msg : "category does not exist"
            })

        }

    }catch(error){
        return res.status(500).json({
            success : false,
            actCode:null,
            msg : error.message
        })
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
    deleteCategory,
    getSubCategoriesByParentCategoryId,
    getCategoryBySlug,
    getCategoryById
}





