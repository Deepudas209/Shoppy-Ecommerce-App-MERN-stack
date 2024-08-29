const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req,res) => {
    try{
        // auth token userId
        const userId = req.userId
        const count = await addToCartModel.countDocuments({
            userId : userId
        })
        res.json({
            data : {
                count : count
            },
            message: "ok",
            success: true,
            error: false
        })
    }catch(err){
        res.json({
            message: err.message || err,
            error: false,
            success: false,
          });
    }
}

module.exports = countAddToCartProduct