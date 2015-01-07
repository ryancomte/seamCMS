(function(){
angular.module('ProductsModule',[]).

    controller('productsController', function($scope,$rootScope,ProductsAPI){

        $scope.products = ProductsAPI.get();
        $scope.addItem = function(item, event){
            item.quantity = 1;
            $rootScope.$broadcast('itemAdded', item );
            event.stopPropagation();
            event.preventDefault();
        }

    });

}());