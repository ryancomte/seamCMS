(function(){
    angular.module('ShoppingCartModule', []).
        controller('shoppingCartController', function($scope, $rootScope, LocalStorage){
            $scope.shoppingCartProds = LocalStorage.get('shopping cart') || [];

            $scope.$watch($scope.shoppingCartProds.length, function(){
               if($scope.shoppingCartProds.length !== 0){
                   $scope.noItems = false;
               }else{
                   $scope.noItems = true;
               }
            });

        });
}());