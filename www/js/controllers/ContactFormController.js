(function() {
    'use strict';
    var module = angular.module('ContactForm', []);
    module.controller('ContactFormController', function($scope, $http) {
        this.scope = $scope;

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
                data: '_method=POST&data[Contacto][nombre]=' + nombre + '&data[Contacto][liam]=' + email + '&data[Contacto][telefono]=' + telefono + '&data[Contacto][ubicacion]=' + ubicacion + '&data[Contacto][consulta]=' + consulta + '&data[Contacto][mail]=' + hashMail + '&data[Contacto][maps]=&' + '&data[Contacto][ant]=' + hashAnt + '&data[Contacto][url]=contactos&',
            });


            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);

        }

        $scope.getHash = function(){
        	 var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/contactos',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });


            // Store the data-dump of the FORM scope.
            request.success(this.httpGetHashSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);
        }

        $scope.httpGetHashSuccess = function(data){
        	var arrTemp = data.split('data[Contacto][mail]" required="required" value="');
        	$scope.hashMail = arrTemp[1].split('"')[0];
        	$scope.hashLast = arrTemp[1].split('data[Contacto][ant]" required="required" placeholder="Confirm email" value="')[1].split('"')[0];

        	alert($scope.hashMail);
        	alert($scope.hashLast) 
        	

        }

        $scope.httpError = function(data, status, headers, config) {
            console.log($scope.debugText);
            $scope.debugText = "error " + status;
        }

        $scope.httpSuccess = function(data, status, headers, config) {
            $scope.debugText = "Exito!: " + data;
        }
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
})();
