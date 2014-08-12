(function() {
    'use strict';
    var module = angular.module('Category', []);

    module.controller('CategoryController', function($scope, $http) {

        $scope.categories = null;



        $scope.getCategory = function(categoryID) {
            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/webservices/categoria.json?id=' + categoryID,
            });

            this.httpGetCategoryDetailsError = function(data, status, headers, config) {
                console.log(data);
            }

            this.httpGetCategoryDetailsSuccess = function(data, status, headers, config) {
                console.log(data.result.child_categories);
                $scope.categories = data.result.child_categories;
            }

            // Store the data-dump of the FORM scope.
            request.success(this.httpGetCategoryDetailsSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpGetCategoryDetailsError);
        }

        $scope.showCategory = function (categoryID)
        {
            $scope.getCategory(categoryID);
            ons.navigator.pushPage('templates/page1.html');
        }

        $scope.getCategory(0);


    });

})();
