(function(){
angular.module('GlobalServices').
    directive('shoppingCart', function(LocalStorage){
        return{
            restrict: 'A',
            templateUrl: 'global/shoppingCart.html',
            replace: true,
            link: function(scope, elem, attrs){

                scope.shoppingCartProds = LocalStorage.get('shopping cart') || [];

                scope.$on('itemAdded', function(event, item){
                    if(scope.shoppingCartProds !== 0){
                        angular.forEach(scope.shoppingCartProds,function(prod){
                            if(item._id === prod._id){
                                console.log('same product');
                            }
                        });
                    }else{
                        scope.shoppingCartProds.push(item);
                    }
                });

                scope.removeProd = function(index){
                    console.log('removed');
                    angular.forEach(scope.shoppingCartProds, function(){
                            scope.shoppingCartProds.splice(index, 1);
                    });
                }
            }
        }
    });
}());