angular.module('GlobalServices').
    factory('ProductsAPI', function($resource){
        return $resource('http://localhost:8097/products/:prodId',{prodId: '@_id'},
            {
                'get': { method:'GET', isArray:true},
                'findById':{method:'GET', params:{prodId: '@prodId'}, isArray:true},
                'add': {method:'POST'},
                'updateProd': {method:'PUT', params:{prodId: '@prodId'}},
                'delete': {method:'DELETE'}
            });
    });