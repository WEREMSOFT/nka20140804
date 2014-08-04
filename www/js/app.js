(function() {
    'use strict';
    var module = angular.module('myApp', ['onsen.directives']);

    module.controller('DetailController', function($scope, $data) {
        $scope.item = $data.selectedItem;
    })

    module.controller('MasterController', function($scope, $data) {
        $scope.items = $data.items;

        $scope.showDetail = function(index) {
            var selectedItem = $data.items[index];
            $data.selectedItem = selectedItem;
            $scope.ons.navigator.pushPage('detail.html', {
                title: selectedItem.title
            });
        }
    });

    module.controller('LoginController', function($scope, $http) {
        this.scope = $scope;
        console.log(globalVariable);
        globalVariable = this;
        console.log(globalVariable);

        $scope.login = function() {
            this.debugText = "enviando...";
            var $email = 'pablo.weremczuk@gmail.com';
            var $pass = '26825782';
            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/usuarios/frontlogin/0',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: '[Login][login]=' + $email + '&[Login][password]=' + $pass + '&',
            });


            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);

        }

        $scope.httpError = function(data, status, headers, config) {
            console.log(globalVariable.scope.debugText);
            globalVariable.scope.debugText = "error " + status;
        }

        $scope.httpSuccess = function(html) {
            globalVariable.scope.debugText = "Exito!: " + html;
        }
    });

    module.factory('$data', function() {
        var data = {};

        data.items = [{
            title: 'Item 1 Title',
            icon: 'comments-o',
            description: 'Item 1 Description'
        }, {
            title: 'Another Item Title',
            icon: 'desktop',
            description: 'Item 2 Description'
        }, {
            title: 'Yet Anoter Item Title',
            icon: 'heart-o',
            description: 'Item 3 Description'
        }, {
            title: 'Item 1 Title',
            icon: 'comments-o',
            description: 'Item 1 Description'
        }, {
            title: 'Another Item Title',
            icon: 'desktop',
            description: 'Item 2 Description'
        }, {
            title: 'Yet Anoter Item Title',
            icon: 'heart-o',
            description: 'Item 3 Description'
        }, {
            title: 'Item 1 Title',
            icon: 'comments-o',
            description: 'Item 1 Description'
        }, {
            title: 'Another Item Title',
            icon: 'desktop',
            description: 'Item 2 Description'
        }, {
            title: 'Yet Anoter Item Title',
            icon: 'heart-o',
            description: 'Item 3 Description'
        }, {
            title: 'Item 1 Title',
            icon: 'comments-o',
            description: 'Item 1 Description'
        }, {
            title: 'Another Item Title',
            icon: 'desktop',
            description: 'Item 2 Description'
        }, {
            title: 'Yet Anoter Item Title',
            icon: 'heart-o',
            description: 'Item 3 Description'
        }, {
            title: 'Item 1 Title',
            icon: 'comments-o',
            description: 'Item 1 Description'
        }, {
            title: 'Another Item Title',
            icon: 'desktop',
            description: 'Item 2 Description'
        }, {
            title: 'Yet Anoter Item Title',
            icon: 'heart-o',
            description: 'Item 3 Description'
        }, {
            title: 'Item 1 Title',
            icon: 'comments-o',
            description: 'Item 1 Description'
        }, {
            title: 'Another Item Title',
            icon: 'desktop',
            description: 'Item 2 Description'
        }, {
            title: 'Yet Anoter Item Title',
            icon: 'heart-o',
            description: 'Item 3 Description'
        }, {
            title: 'Item 1 Title',
            icon: 'comments-o',
            description: 'Item 1 Description'
        }, {
            title: 'Another Item Title',
            icon: 'desktop',
            description: 'Item 2 Description'
        }, {
            title: 'Yet Anoter Item Title',
            icon: 'heart-o',
            description: 'Item 3 Description'
        }, {
            title: 'Item 1 Title',
            icon: 'comments-o',
            description: 'Item 1 Description'
        }, {
            title: 'Another Item Title',
            icon: 'desktop',
            description: 'Item 2 Description'
        }, {
            title: 'Yet Anoter Item Title',
            icon: 'heart-o',
            description: 'Item 3 Description'
        }];

        return data;
    });


    module.controller('ContactController', function($scope) {
        $scope.callSucursal = function() {
            //window.open('tel:45239431', '_new');
        }
    });

    var globalVariable = null;
})();
