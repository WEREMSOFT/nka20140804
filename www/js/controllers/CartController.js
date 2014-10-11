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
        if ($scope.product) {
            if ($scope.product.selected_option) {
                for (var i = 0; $scope.talle.id === null && i < $scope.product.options.length; i++) {
                    if ($scope.product.options[i].id === $scope.product.selected_option) {
                        $scope.talle = $scope.product.options[i];
                    }
                }

            }
        }

        $scope.isWorking = false;
        $scope.products = [];
        $scope.isCart = true;




        $scope.formaEnvio = '';


        $scope.observaciones = "";


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
            console.log('->' + $scope.cantidad);
            console.log('->' + ($scope.cantidad > 1 ? 's' : ''));
            var strConfirmationText = ' ' + $scope.cantidad + ' item' + ($scope.cantidad > 1 ? 's' : '') + ' agregado' + ($scope.cantidad > 1 ? 's' : '') + ' al carrito.';
            navigator.notification.confirm(
                strConfirmationText, // message
                $scope.onPromtAddToCartOk, // callback to invoke with index of button pressed
                'Éxito', // title
                ['Ver Carrito', 'Seguir'] // buttonLabels
            );
        }

        $scope.onConfirmAddToCart =  function(buttonIndex) {
            
        }



        $scope.onPromtAddToCartOk = function(buttonIndex) {
            alert('You selected button ' + buttonIndex);
            switch(buttonIndex)
            {
                case 1:
                    ons.navigator.pushPage('templates/pages/Cart.html');
                    break;
            }
            //ons.navigator.popPage();
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

                data: '_method=PUT&data[Pedido][nombre]=' + userData.profileData.nombre + '&data[Pedido][apellido]=' + userData.profileData.apellido + '&data[Pedido][mail]=' + userData.profileData.mail + '&data[Pedido][cod_area]=' + userData.profileData.cod_area + '&data[Pedido][celular]=' + userData.profileData.celular + '&data[Pedido][tipo_seguro]=' + $scope.tipoSeguro + '&data[Pedido][forma_envio]=' + $scope.formaEnvio + '&data[Pedido][direccion]=' + userData.profileData.direccion + '&data[Pedido][terminal]=' + userData.profileData.terminal + '&data[Pedido][codigo_postal]=' + userData.profileData.codigo_postal + '&data[Pedido][provincia_id]=' + userData.profileData.provincia_id + '&data[Pedido][forma_pago]=' + $scope.formaDePago + '&data[Pedido][telefono]=' + userData.profileData.telefono + '&data[Pedido][observaciones]=' + $scope.observaciones + '&data[Pedido][iva_facturacion]=' + userData.profileData.iva_facturacion + '&data[Pedido][razon_social]=' + userData.profileData.razon_social + '&data[Pedido][cuit]=' + userData.profileData.cuit + '&'
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
