(function(){
    angular.module('EcommerceApp', ['ui.router','ngResource','NavModule','ProductsModule','DetailsModule','AdminModule','ImagesModule','GlobalServices','ShoppingCartModule']).

    config(function($stateProvider,  $urlRouterProvider){

            $urlRouterProvider.otherwise('/');

            var nav = {
              templateUrl: 'nav/nav.html',
              controller: 'navController'
            };

            $stateProvider

            .state('products',{
                url:'/',
                views: {
                    "nav": nav,
                    "body": {
                        templateUrl: 'products/products.html',
                        controller: 'productsController'
                    }
                }
            })
            .state('details',{
                url:'/details/:prodId',
                views: {
                    "nav": nav,
                    "body": {
                        templateUrl: 'details/details.html',
                        controller: 'detailsController'
                    }
                }
            })
            .state('shopping cart',{
                url: '/shopping-cart',
                views: {
                    "nav": nav,
                    "body": {
                        templateUrl: "shopping-cart/shoppingCart.html",
                        controller: "shoppingCartController"
                    }
                }
            })
            .state('add products', {
                url: '/add-products',
                views: {
                    "nav": nav,
                    "body": {
                        templateUrl: 'admin/addProducts.html',
                        controller: 'adminController'
                    }
                },
                resolve:{
                    adminProds: function(ProductsAPI){
                        return ProductsAPI.get();
                    }
                }
            })
            .state('add images',{
                url: '/add-images',
                views: {
                    "nav": nav,
                    "body": {
                        templateUrl: 'addImages/images.html',
                        controller: 'imagesController'
                    }
                }
            })
            .state('login', {
                url: '/login',
                    templateUrl: 'login/login.html',
                    controller: 'loginController'
            });
    });

}());