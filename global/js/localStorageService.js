(function(){
    angular.module('GlobalServices', []).
        factory('LocalStorage', function($window){

           var winStorage = $window.localStorage,
               local = {};

           local.get = function(key){
               return angular.fromJson(winStorage.getItem(key));
           } ;

            local.set = function(key, value){
                winStorage.setItem(key, angular.toJson(value));
            };

            return local;
        });
}());