(function() {
    'use strict';
    var module = angular.module('ContactForm', []);
    module.controller('ContactFormController', function($scope, $http) {
        $scope.nombre = "werem";
        $scope.email = "werem@yopmail.com";
        $scope.telefono = "1568760653";
        $scope.ubicacion = "vicente lopez";
        $scope.consulta = "Consulta Cadorna";
        $scope.isWorking = false;

        $scope.sendContact = function() {

            var hashMail = $scope.hashMail;
            var hashAnt = $scope.hashAnt;

            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/contactos',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: '_method=POST&data[Contacto][nombre]=' + $scope.nombre + '&data[Contacto][liam]=' + $scope.email + '&data[Contacto][telefono]=' + $scope.telefono + '&data[Contacto][ubicacion]=' + $scope.ubicacion + '&data[Contacto][consulta]=' + $scope.consulta + '&data[Contacto][mail]=' + hashMail + '&data[Contacto][maps]=&' + '&data[Contacto][ant]=' + hashAnt + '&data[Contacto][url]=contactos&',
            });


            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);

        }

        $scope.goBack = function()
        {
             //if($scope.isWorking === true) return;
            ons.navigator.popPage();
        }

        $scope.getHash = function(){
            if($scope.isWorking == true) return;
            $scope.isWorking = true;
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
        	$scope.hashAnt = arrTemp[1].split('data[Contacto][ant]" required="required" placeholder="Confirm email" value="')[1].split('"')[0];

            $scope.sendContact();
        }

        $scope.httpError = function(data, status, headers, config) {
            alert("Ooosp!, algo ha salido mal, reintente en un momento");
            $scope.isWorking = false;
        }

        $scope.httpSuccess = function(data, status, headers, config) {
            alert('Su consulta ha sido enviado con éxito!');
            ons.navigator.popPage();
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
