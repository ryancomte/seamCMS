var Products = require('./productsSchema.js');

var getProducts = function(req, res){
    Products.find()
        .exec(function(err, products){
            res.send(products);
            if(err){
                res.send("this didn't work");
            }
        });
};

var findById = function(req, res){
    Products.findById(req.params.id, function (err, product) {
        if (!err) {
            res.jsonp(product);
        } else {
            console.log(err);
        }
    });
}

var postProducts = function(req, res){
    var newProd = new Products(
        {
            productId: req.body.productId,
            brand: req.body.brand,
            name: req.body.name,
            price: req.body.price,
            quantity: 0,
            specs: req.body.specs,
            desc: req.body.desc,
            imgUrl: req.body.imgUrl
        }
    );
    newProd.save(function(err){
        res.status('success').send(newProd);
    })
};

var updateProducts = function(req, res){
    Products.update({productId: req.params.id},{
        productId: req.body.productId,
        brand: req.body.brand,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        specs: req.body.specs,
        desc: req.body.desc,
        imgUrl: req.body.imgUrl
    },callback);

    function callback(err, num){
        if(err){
            res.send(err);
        }else{
            res.send(num);
        }
    }
};

var deleteProducts = function (req, res){
    Products.findOne({productId: req.params.id},function(err,result){
        result.remove();
    });
};

module.exports = {
    get: getProducts,
    findById: findById,
    post: postProducts,
    update: updateProducts,
    delete: deleteProducts
};
