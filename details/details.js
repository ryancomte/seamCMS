(function(){

angular.module('DetailsModule',[]).
    controller('detailsController', function($scope, $stateParams, $rootScope, ProductsAPI){

        $scope.quantity = 1;

        $scope.prodId = $stateParams.prodId;
        $scope.products = ProductsAPI.get();
        $scope.test = ProductsAPI.findById({productId: $scope.prodId});
        $scope.addItem = function(item, quantity, event){
            var itemCopy = angular.copy(item);
            itemCopy.price *= quantity;
            itemCopy.quantity = quantity;
            $rootScope.$broadcast('itemAdded', itemCopy);
            event.stopPropagation();
            event.preventDefault();
        }

    });

}());