(function(){
    angular.module('NavModule',[]).

    controller('navController',function($scope,$rootScope, $location,LocalStorage){

        $scope.shoppingCartTotal = LocalStorage.get('total') || 0;
        $scope.counter = LocalStorage.get('counter') || 0;

        //$scope.addToShoppingCart = function(price){
        //    $scope.shoppingCartTotal += price;
        //};

        $scope.$on('itemAdded', function(event,item){
            $scope.shoppingCartTotal += item.price;
            if(item.quantity){
                $scope.counter += item.quantity;
            }else{
                $scope.counter ++;
            }

            LocalStorage.set('counter',$scope.counter);
            LocalStorage.set('total',$scope.shoppingCartTotal);
        });

//Conditional to set if this is the admin tool or not. If it is the admin tool, it will change the expression in the ng-switch, changing the navigation.

        if($location.path() === '/add-products' || $location.path() === '/add-images'){
            $scope.admin = true;
        }else{
            $scope.admin = false;
        };

        //var changeLink = function(){
        //    if($scope.admin === true){
        //        return 'admin';
        //    }else{
        //        return 'products';
        //    }
        //};
    });

}());
