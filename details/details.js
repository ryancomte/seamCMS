(function(){

angular.module('DetailsModule',[]).
    controller('detailsController', function($scope, $stateParams, $rootScope, ProductsAPI, LocalStorage){

        var shoppingCart = LocalStorage.get('shopping cart') || [];

        $scope.quantity = 1;

        $scope.prodId = $stateParams.prodId;
        $scope.products = ProductsAPI.get();
        $scope.test = ProductsAPI.findById({productId: $scope.prodId});
        $scope.addItem = function(item, quantity, event){
            var itemCopy = angular.copy(item);
            itemCopy.price *= quantity;
            itemCopy.quantity = quantity;
            if(shoppingCart.length !== 0){
                angular.forEach(shoppingCart, function(product){
                   if(itemCopy.productId === product.productId){
                       product.quantity += itemCopy.quantity;
                       product.price += itemCopy.price;
                       console.log(product);
                   }else{
                       shoppingCart.push(itemCopy);
                   }
                });
            }else(shoppingCart.push(itemCopy));
            LocalStorage.set('shopping cart', shoppingCart);
            $rootScope.$broadcast('itemAdded', itemCopy);
            event.stopPropagation();
            event.preventDefault();
        }

    });

}());