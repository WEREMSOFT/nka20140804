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
            $scope.ons.navigator.pushPage('templates/detail.html', {
                title: selectedItem.title
            });
        }
    });

    module.controller('ContactFormController', function($scope, $http) {
        this.scope = $scope;
        console.log("->" + globalVariable);
        globalVariable = this;
        console.log("->" + globalVariable);

        $scope.test = function(){
            console.log("testando");
        }

        $scope.sendContact = function() {
            this.debugText = "enviando...";
            var nombre = "werem";
            var telefono = "726768726872";
            var ubicacion = "VICENTE LOPEZ";
            var email = 'werem@yopmail.com';
            var consulta = "texto de la consulta";
            var hashMail = "bdfdd68e313ed7b27afd2c82d37fd8f65d9d21c7";
            var hashAnt = "04ee83e501cba614fbb591e2d31460ca745cc11c";
            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/contactos',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: '_method=POST&data[Contacto][nombre]=' + nombre + '&data[Contacto][liam]=' + email +'&data[Contacto][telefono]=' + telefono + '&data[Contacto][ubicacion]=' + ubicacion + '&data[Contacto][consulta]=' + consulta +'&data[Contacto][mail]=' + hashMail +'&data[Contacto][maps]=&' + '&data[Contacto][ant]=' + hashAnt + '&data[Contacto][url]=contactos&',
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

        $scope.httpSuccess = function(data, status, headers, config) {
            globalVariable.scope.debugText = "Exito!: " + data;
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

        $scope.httpSuccess = function(data, status, headers, config) {
            globalVariable.scope.debugText = "Exito!: " + headers;
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

    module.controller('GridMenuHomeController', function($scope) {
        $scope.items = [{
            title: "Equipo de escalada",
            icon: "search",
            page: "templates/page1.html"
        }, {
            title: "Equipo de escalada",
            icon: "search",
            page: "page1.html"
        }, {
            title: "Equipo de escalada",
            icon: "search",
            page: "page1.html"
        }, {
            title: "Equipo de escalada",
            icon: "search",
            page: "page1.html"
        }, {
            title: "Equipo de escalada",
            icon: "search",
            page: "page1.html"
        }, {
            title: "Equipo de escalada",
            icon: "search",
            page: "page1.html"
        }, {
            title: "Equipo de escalada",
            icon: "search",
            page: "page1.html"
        }, {
            title: "Equipo de escalada",
            icon: "search",
            page: "page1.html"
        }, {
            title: "Equipo de escalada",
            icon: "search",
            page: "page1.html"
        }];
    });

    module.controller('ContactController', function($scope) {
        $scope.cods_sucursal = {
            VICENTE_LOPEZ: 0,
            CAPITAL: 1
        };

        $scope.callSucursal = function(cod_sucursal) {
            console.log(cod_sucursal);
            switch (cod_sucursal) {
                case this.cods_sucursal.VICENTE_LOPEZ:
                    window.open('tel:01147979435', '_new');
                    break;
                case this.cods_sucursal.CAPITAL:
                    window.open('tel:45462853', '_new');
                    break;
            }
        }
        $scope.emailSucursal = function(cod_sucursal) {
            console.log(cod_sucursal);
            switch (cod_sucursal) {
                case this.cods_sucursal.VICENTE_LOPEZ:
                    var link = "mailto:info@nakaoutdoors.com.ar" + "?subject=" + escape("Consulta") + "&body=" + escape("Estimados Naka Outdoors:\n");
                    window.open(link, '_new');
                    break;
                case this.cods_sucursal.CAPITAL:
                    var link = "mailto:urquiza@nakaoutdoors.com.ar" + "?subject=" + escape("Consulta") + "&body=" + escape("Estimados Naka Outdoors:\n");
                    window.open(link, '_new');
                    break;
            }
        }
    });

    

    var globalVariable = null;
})();
