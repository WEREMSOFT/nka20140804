(function() {
    'use strict';
    var module = angular.module('QuestionOnProduct', []);
    module.controller('QuestionOnProductController', function($scope, $http, userData) {

        if (userData.profileData) {
            $scope.nombre = userData.profileData.login;
            $scope.email = userData.profileData.mail;
            $scope.telefono = userData.profileData.celular;
            $scope.ubicacion = userData.profileData.localidad;
            $scope.user_id = userData.profileData.id;
        } else if (userData.lastProfileData) {
            $scope.nombre = userData.lastProfileData.login;
            $scope.email = userData.lastProfileData.mail;
            $scope.telefono = userData.lastProfileData.celular;
            $scope.ubicacion = userData.lastProfileData.localidad;
            $scope.user_id = userData.lastProfileData.id;
        } else {
            $scope.nombre = "";
            $scope.email = "";
            $scope.telefono = "";
            $scope.ubicacion = "";
        }

        $scope.consulta = "";
        $scope.isWorking = false;

        $scope.sendContact = function() {

            var hashMail = $scope.hashMail;
            var hashAnt = $scope.hashAnt;

            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/articulos/index.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: '_method=POST&data[Opinion][nombre]=' + $scope.product.title + '&data[Opinion][articulo_id]=' + $scope.product.id + '&data[Opinion][usuario_id]=' + $scope.user_id + '&data[Opinion][name]=' + $scope.nombre + '&data[Opinion][liam]=' + $scope.email + '&data[Opinion][telefono]=' + $scope.telefono + '&data[Opinion][ubicacion]=' + $scope.ubicacion + '&data[Opinion][message]=' + $scope.consulta + '&data[Opinion][mail]=' + hashMail + '&data[Opinion][maps]=&' + '&data[Opinion][ant]=' + hashAnt + '&data[Opinion][url]=contactos&',
            });


            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);

        }

        $scope.goBack = function() {
            if ($scope.isWorking === true) return;
            ons.navigator.popPage();
        }

        $scope.getHash = function() {
            console.log('enviando consulta...');
            if ($scope.isWorking === true) return;
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

        $scope.httpGetHashSuccess = function(data) {
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
})();
