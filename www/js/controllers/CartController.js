(function() {
    'use strict';
    var module = angular.module('Cart', []);


    module.controller('CartController', function($scope, $http, shoppingCart, userData) {
        $scope.shoppingCart = shoppingCart;
        $scope.cantidad = 1;
        $scope.talle = {
            id: null,
            name: null
        };
        $scope.isWorking = false;
        $scope.products = [];
        $scope.isCart = true;
        if (userData.profileData) {
            $scope.razonSocial = userData.profileData.razon_social;
            //---Datos de envío y usuario
            $scope.nombre = userData.profileData.nombre;
            $scope.apellido = userData.profileData.apellido;
            $scope.mail = userData.profileData.mail;
            $scope.celular = userData.profileData.celular;
            $scope.localidad = userData.profileData.localidad;
            $scope.codigoPostal = userData.profileData.codigo_postal;
            $scope.codArea = userData.profileData.cod_area;
            $scope.direccion = userData.profileData.direccion;
            $scope.terminal = userData.profileData.terminal;
            $scope.telefono = userData.profileData.telefono;
            $scope.cuit = userData.profileData.cuit;
            $scope.nombre_fantasia = userData.profileData.nombre_fantasia;
        }



        $scope.formaEnvio = '';

        $scope.provincia = '';

        $scope.observaciones = "";



        $scope.formaDePago = '';

        $scope.buyOptions = {};



        $scope.addToCart = function() {
            if ($scope.product.options && !$scope.talle.id) {
                prompt('Debe elegir una opción');
                return;
            }
            $scope.isWorking = true;
            console.log($scope.talle);
            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/articulos/carrito_add.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=POST&data[Articulo][id]=' + $scope.product.id + '&data[Articulo][cantidad]=' + $scope.cantidad + '&data[Articulo][opcion]=' + $scope.talle.id + '&data[Articulo][nombre_opcion]=' + $scope.talle.name + '&'
            });



            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);

        }

        $scope.httpError = function(data, status, headers, config) {
            promptError('Oops! Algo ha salido mal. Reintenta en un momento', null, 'Sin Conección', 'Bueno');
        }

        $scope.httpSuccess = function(data, status, headers, config) {
            console.log(data);
            shoppingCart.refreshCartDetails();
            $scope.products = data.result;
            $scope.isWorking = false;
            prompt('Item agregado con éxito', $scope.onPromtAddToCartOk, 'Éxito', 'Ok');
        }

        $scope.onPromtAddToCartOk = function() {
            ons.navigator.popPage();
        }

        $scope.init = function() {
            console.log(ons.navigator.getCurrentPage().name);
            $scope.shoppingCart.refreshCartDetails();
            $scope.getBuyOptions();
        }

        $scope.completarDatosEnvio = function() {
            console.log($scope.shoppingCart.cartData.items.length);
            if (!$scope.shoppingCart.cartData.items.length) {
                prompt("Su carrito de compras esta vacío");
                return;
            }
            ons.navigator.pushPage('templates/forms/CartDatosEnvio.html')
        }


        $scope.enviarPedido = function() {
            console.log($scope.formPedido);
            if ($scope.formPedido.$invalid) {
                prompt("Debe completar todos los campos marcados en rojo");
                return;
            }
            $scope.isWorking = true;
            var request = $http({
                method: "put",
                url: 'http://www.nakaoutdoors.com.ar/pedidos/carrito_index',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=PUT&data[Pedido][nombre]=' + $scope.nombre + '&data[Pedido][apellido]=' + $scope.apellido + '&data[Pedido][mail]=' + $scope.mail + '&data[Pedido][cod_area]=' + $scope.codArea + '&data[Pedido][celular]=' + $scope.celular + '&data[Pedido][tipo_seguro]=' + $scope.tipoSeguro + '&data[Pedido][forma_envio]=' + $scope.formaEnvio + '&data[Pedido][direccion]=' + $scope.direccion + '&data[Pedido][terminal]=' + $scope.terminal + '&data[Pedido][codigo_postal]=' + $scope.codigoPostal + '&data[Pedido][provincia_id]=' + $scope.provincia + '&data[Pedido][forma_pago]=' + $scope.formaDePago + '&data[Pedido][telefono]=' + $scope.telefono + '&data[Pedido][observaciones]=' + $scope.observaciones + '&data[Pedido][iva_facturacion]=' + $scope.ivaFacturacion + '&data[Pedido][razon_social]=' + $scope.razonSocial + '&data[Pedido][cuit]=' + $scope.cuit + '&'

            });



            // Store the data-dump of the FORM scope.
            request.success(this.httpEnviarPedidoSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpEnviarPedidoError);

        }

        $scope.httpEnviarPedidoError = function(data, status, headers, config) {
            promptError('Oops! Algo ha salido mal. Reintenta en un momento', null, 'Sin Conección', 'Bueno');
        }

        $scope.httpEnviarPedidoSuccess = function(data, status, headers, config) {
            prompt('Su pedido ha sido enviado con éxito.', goBackOnePage);
            $scope.shoppingCart.refreshCartDetails();
            $scope.isWorking = false;
        }

        $scope.eliminarDelCarrito = function(id) {
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/articulos/carrito_del.json?id=' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            // Store the data-dump of the FORM scope.
            request.success(this.httpEliminarDelCarritoSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpEliminarDelCarritoError);
        }

        $scope.httpEliminarDelCarritoError = function(data, status, headers, config) {
            promptError('Oops! Algo ha salido mal. Reintenta en un momento', null, 'Sin Conección');
            $scope.isWorking = false;
        }

        $scope.httpEliminarDelCarritoSuccess = function(data, status, headers, config) {
            prompt('Item eliminado.', null, 'Éxito');
            $scope.shoppingCart.refreshCartDetails();
            $scope.isWorking = false;
        }

        $scope.quantityIncrement = function() {
            $scope.cantidad++;
        }
        $scope.quantityDecrement = function() {
            $scope.cantidad--;
            $scope.cantidad = $scope.cantidad < 1 ? 1 : $scope.cantidad;
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

    });
})();
