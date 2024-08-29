const productModel = require("../../models/productModel")

const searchProduct = async (req,res) => {
    try{
        const query = req.query.q
        // console.log("query", query)
        const regex = new RegExp(query,'i','g')
        const product = await productModel.find({
            "$or" : [
                {
                    productName : regex
                },
                {
                    category : regex
                }
            ]
        })
        res.json({
            data: product,
            message: "Search product list",
            success: true,
            error: false
        })
    }catch(err){
        res.json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = searchProduct