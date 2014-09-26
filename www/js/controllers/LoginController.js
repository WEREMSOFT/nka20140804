(function() {
    'use strict';
    var module = angular.module('Login', []);


    module.controller('LoginController', function($scope, $http, userData) {
        $scope.userData = userData;
        $scope.isWorking = false;
        $scope.editMode = false;
        $scope.buyOptions = {};

        $scope.login = function() {
            if ($scope.isWorking) return;
            if (!$scope.user) {
                promptError('La dirección de mail no es válida');
                return;
            }
            $scope.isWorking = true;

            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/usuarios/applogin.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=POST&data[Login][login]=' + $scope.user + '&data[Login][password]=' + $scope.password + '&',
            });


            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);

        }

        $scope.httpError = function(data, status, headers, config) {
            $scope.isWorking = false;
            promptError("Oops! Algo ha salido mal. Reintenta en un momento");
        }

        $scope.httpSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            if (data.result.logedIn === 1) {
                window.localStorage.setItem("user", $scope.user);
                window.localStorage.setItem("password", $scope.password);
                window.localStorage.setItem("logedIn", true);
                $scope.userData.profileData = data.result.Usuario;
                $scope.userData.profileData.provincia_id = parseInt($scope.userData.profileData.provincia_id);
                $scope.userData.profileData.iva_facturacion = parseInt($scope.userData.profileData.iva_facturacion);
                window.localStorage.setItem("profileData", JSON.stringify(data.result.Usuario));
                $scope.userData.logedIn = true;
                ons.navigator.resetToPage('templates/PageHome.html');
            } else if (data.result.logedIn === -2) {
                promptError('Nombre de usuario o contraseña invalidas');
                $scope.logout();
            }
        }

        $scope.init = function() {
            console.log('inicializando......' + ons.navigator.getCurrentPage().name);
            if (ons.navigator.getCurrentPage().name === 'templates/FormProfile.html') {
                $scope.userData.refreshUserDetails();
                //$scope.userData = ons.navigator.getCurrentPage().options.userData; 
                return;
            }
            if ($scope.userData.logedIn === true) {
                ons.navigator.resetToPage('templates/FormProfile.html');
            } else {
                $scope.user = window.localStorage.getItem('user');
                $scope.password = window.localStorage.getItem('password');
            }
        }

        $scope.getBuyOptions = function() {
            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/pedidos/buy_options.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            // Store the data-dump of the FORM scope.
            request.success(this.httpGetBuyOptiondSuccess);

            // Store the data-dump of the FORM scope.
            request.error(this.httpGetBuyOptiondError);
        }

        $scope.httpGetBuyOptiondSuccess = function(data, status, headers, config) {
            $scope.buyOptions = data.result;
            console.log($scope.buyOptions);
        }

        $scope.httpGetBuyOptiondError = function() {

        }

        $scope.logout = function() {
            $scope.isWorking = true;
            userData.logout(this.logoutSuccess, this.logoutError);
        }

        $scope.logoutError = function(data, status, headers, config) {
            $scope.isWorking = false;
            console.log("Oops! Algo ha salido mal. Reintenta en un momento");
        }

        $scope.logoutSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.userData.reset();
            ons.navigator.resetToPage('templates/PageHome.html');
        }

        $scope.editProfile = function() {
            $scope.editMode = true;
            $scope.getBuyOptions();
        }

        $scope.saveProfile = function() {
            $scope.editMode = false;
            if ($scope.formUser.$invalid) {
                prompt("Debe completar todos los campos marcados en rojo");
                return;
            }
            $scope.isWorking = true;
            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/client/usuarios/edit.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=POST&data[Usuario][nombre]=' + userData.profileData.nombre + '&data[Usuario][apellido]=' + userData.profileData.apellido + '&data[Usuario][mail]=' + userData.profileData.mail + '&data[Usuario][cod_area]=' + userData.profileData.cod_area + '&data[Usuario][celular]=' + userData.profileData.celular + '&data[Usuario][direccion]=' + userData.profileData.direccion + '&data[Usuario][terminal]=' + userData.profileData.terminal + '&data[Usuario][codigo_postal]=' + userData.profileData.codigo_postal + '&data[Usuario][provincia_id]=' + userData.profileData.provincia_id + '&data[Usuario][telefono]=' + userData.profileData.telefono + '&data[Usuario][iva_facturacion]=' + userData.profileData.iva_facturacion + '&data[Usuario][razon_social]=' + userData.profileData.razon_social + '&data[Usuario][cuit]=' + userData.profileData.cuit + '&data[Usuario][localidad]=' + userData.profileData.localidad + '&data[Usuario][partido]=' + userData.profileData.partido + '&data[Usuario][dir_facturacion]=' + userData.profileData.dir_facturacion + '&data[Usuario][nombre_fantasia]=' + userData.profileData.nombre_fantasia + '&data[Usuario][imagen]=' + userData.profileData.imagen + '&data[Usuario][perfil]=' + userData.profileData.perfil + '&'

            });


            // Store the data-dump of the FORM scope.
            request.success($scope.httpSaveProfileSuccess);


            // Store the data-dump of the FORM scope.
            request.error($scope.httpSaveProfileError);

            //http://www.nakaoutdoors.com.ar/client/usuarios/edit.json
        }

        $scope.httpSaveProfileError = function(data, status, headers, config) {
            promptError('Oops! Algo ha salido mal. Reintenta en un momento', null, 'Sin Conección', 'Bueno');
        }

        $scope.httpSaveProfileSuccess = function(data, status, headers, config) {
            $scope.editMode = false;
            $scope.isWorking = false;
            $scope.userData.refreshUserDetails();
        }
        // Upload image to server
        $scope.onCameraSuccess = function(pImageData) {
            $.post("upload.php", {
                data: imageData
            }, function(data) {});

            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/client/usuarios/edit.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=POST&data[Usuario][nombre]=' + userData.profileData.nombre + '&data[Usuario][apellido]=' + userData.profileData.apellido + '&data[Usuario][mail]=' + userData.profileData.mail + '&data[Usuario][cod_area]=' + userData.profileData.cod_area + '&data[Usuario][celular]=' + userData.profileData.celular + '&data[Usuario][direccion]=' + userData.profileData.direccion + '&data[Usuario][terminal]=' + userData.profileData.terminal + '&data[Usuario][codigo_postal]=' + userData.profileData.codigo_postal + '&data[Usuario][provincia_id]=' + userData.profileData.provincia_id + '&data[Usuario][telefono]=' + userData.profileData.telefono + '&data[Usuario][iva_facturacion]=' + userData.profileData.iva_facturacion + '&data[Usuario][razon_social]=' + userData.profileData.razon_social + '&data[Usuario][cuit]=' + userData.profileData.cuit + '&data[Usuario][localidad]=' + userData.profileData.localidad + '&data[Usuario][partido]=' + userData.profileData.partido + '&data[Usuario][dir_facturacion]=' + userData.profileData.dir_facturacion + '&data[Usuario][nombre_fantasia]=' + userData.profileData.nombre_fantasia + '&data[Usuario][imagen]=' + pImageData + '&data[Usuario][perfil]=' + userData.profileData.perfil + '&'

            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpSaveProfileSuccess);


            // Store the data-dump of the FORM scope.
            request.error($scope.httpSaveProfileError);

        }

        $scope.onCameraFail = function(pMessage) {
            promptError("Error al subir imagen: " + pMessage);
        }

        // Take a picture using the camera or select one from the library
        $scope.takePicture = function(e) {
            navigator.camera.getPicture($scope.onCameraSuccess, $scope.onCameraFail, {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL
            });
        }

    });

    module.directive('profileEdit', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/profile/profileEdit.html'
        };
    });

    module.directive('profileRead', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/profile/profileRead.html'
        };
    });

})();
