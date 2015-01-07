(function(){
    angular.module('AdminModule', []).
        filter('ellipsis', function(){
            return function(input,num){
                    var newString = input.slice(0,num);
                if(input.length > num){
                     return newString + '...';
                }else{
                    return input;
                }
            };
        }).
        controller('adminController', function($scope, ProductsAPI, $timeout,adminProds,$q){

            var promises = {
                data: adminProds.$promise
            };

            var apiResp = function(resp){
                $scope.productsList = resp.data;
                if($scope.productsList) {
                    $scope.productCount = $scope.productsList.length;
                }
            };

            $q.all(promises).then(apiResp);

            $scope.product = {};

            $scope.showAdd = function(){
                $scope.addItem = !$scope.addItem;
                $scope.edit = false;
                if(!$scope.productsList.length){
                    $scope.product.productId = 100;
                }else{
                    $scope.product.productId = $scope.productsList[$scope.productsList.length - 1].productId + 1;
                }
            }

            $scope.specList = [];
            $scope.addSpec = function(event,spec){
                if(event.charCode === 13 || event.charCode === 44){
                    $scope.specList.push(spec);
                    $scope.product.spec = null;
                }
            };

            $scope.removeSpec = function(index){
                $scope.specList.splice(index,1);
            };

            var resetAdd = function(){
                $scope.product = {};
                $scope.specList = [];

            };

            $scope.addProduct = function(product,type){
                if(type === 'another'){
                    product.specsList = $scope.specList;
                    resetAdd();
                    ProductsAPI.add(product);
                    $scope.productsList.push(product);
                    $scope.product.productId = $scope.productsList[$scope.productsList.length - 1].productId + 1;
                    $scope.productCount ++;
                }else if(type === 'cancel'){
                    resetAdd();
                    $scope.addItem = false;
                }else if(type === 'update'){
                    resetAdd();
                    $scope.addItem = false;
                    ProductsAPI.updateProd({prodId: product.productId},product);
                    //this is in here to match up already existing data. This way it won't create a new record.
                    angular.forEach($scope.productsList, function(data,key){
                        if(data.productId === product.productId){
                            $scope.productsList[key] = product;
                        }
                    });

                }else{
                    product.specs = $scope.specList;
                    resetAdd();
                    $scope.addItem = false;
                    ProductsAPI.add(product);
                    $scope.productsList.push(product);
                    $scope.productCount ++;
                }
            };


            $scope.removeProd = function(index,product){
                ProductsAPI.delete({prodId: product.productId});
                $scope.productsList.splice(index,1);
            };

            $scope.editProd = function(item){
                $scope.addItem = true;
                $scope.product = angular.copy(item);
                $scope.specList = item.specs;
                $scope.edit = true;
            }

            $scope.cheatFunct = function(){
                $scope.product = {
                    name: 'New Product',
                    imgUrl: 'img.jpg',
                    desc: 'This is a short description about what the product is. It is going to be abbreviated in the tool anyway',
                    brand:'Good Game',
                    productId: $scope.product.productId,
                    price: 125.34
                }
                $scope.specList = ['New','leather','Warranty','Small, medium and large','Will make you stronger'];
            }
        });

}());
