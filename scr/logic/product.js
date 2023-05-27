const PRODUCT = require('../models/product');
module.exports = {
    getProduct: async (req, res, next) => {
        // res.json({'name': "Mariam", 'color': "green"})
        const product = await PRODUCT.find();
        res.json({
            result : product.map(res => {
                return {
                    id : res.id,
                    name : res.name,
                    desc : res.desc,
                }
            })
        })
    },
    insertProduct: async (req, res) => {
        const product = await new PRODUCT({
            name: req.body.name,
            price: req.body.price,
            desc: req.body.desc
        }).save()

        res.json({"message": "inserted Successfully",
         id: product.id,
         name: product.name})
    },

    deleteProduct : async (req, res) => {
        const id = req.params.id;
        const del = await PRODUCT.findByIdAndRemove(id);
        res.json({"delete" : del});
    }
}
