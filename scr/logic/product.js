const PRODUCT = require('../models/product');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../auth/verifytoken');

module.exports = {
    getProduct: [
        // verifyToken, // Add token verification for all users
        async (req, res, next) => {
            try {
                const product = await PRODUCT.find();
                res.json({
                    result: product.map((res) => {
                        return {id: res.id, name: res.name, desc: res.desc};
                    })
                });
            } catch (error) {
                res.status(500).json({error: error.message});
            }
        },
    ],

    insertProduct: [
        verifyTokenAndAuthorization, // Add token verification for authorized users
        async (req, res) => {
            try {
                const product = await new PRODUCT({name: req.body.name, price: req.body.price, desc: req.body.desc}).save();

                res.json({message: 'Inserted Successfully', id: product.id, name: product.name});
            } catch (error) {
                res.status(500).json({error: error.message});
            }
        },
    ],

    deleteProduct: [
        verifyTokenAndAdmin, // Add token verification for admin only
        async (req, res) => {
            try {
                const id = req.params.id;
                const del = await PRODUCT.findByIdAndRemove(id);
                res.json({delete: del});
            } catch (error) {
                res.status(500).json({error: error.message});
            }
        },
    ]
};
