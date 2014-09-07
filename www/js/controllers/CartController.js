(function() {
    'use strict';
    var module = angular.module('Cart', []);


    module.controller('CartController', function($scope, $http, shoppingCart, userData) {
        $scope.shoppingCart = shoppingCart;
        $scope.cantidad = 1;
        $scope.myTalle = {};
        $scope.working = false;
        $scope.products = [];
        $scope.isCart = true;

        //---Datos de envío y usuario
        $scope.nombre = userData.profileData.nombre;
        $scope.apellido = userData.profileData.apellido;
        $scope.mail = userData.profileData.mail;
        $scope.celular = userData.profileData.celular;

        $scope.formaEnvio = '';
        $scope.localidad = userData.profileData.localidad;
        $scope.codigoPostal = userData.profileData.codigo_postal;
        $scope.provincia = '';

        $scope.observaciones = "Compra de prueba, hacer caso omiso de la misma."

        $scope.codArea = userData.profileData.cod_area;
        $scope.direccion = userData.profileData.direccion;
        $scope.terminal = userData.profileData.terminal;
        $scope.telefono = userData.profileData.telefono;
        $scope.cuit = userData.profileData.cuit;
        $scope.nombre_fantasia = userData.profileData.nombre_fantasia;

        $scope.formaDePago = '';

        $scope.addToKart = function() {

            $scope.working = true;
            console.log($scope.myTalle);
            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/articulos/carrito_add.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=POST&data[Articulo][id]=' + $scope.product.id + '&data[Articulo][cantidad]=' + $scope.cantidad + '&data[Articulo][talle]=' + $scope.myTalle + '&'
            });



            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);

        }

        $scope.httpError = function(data, status, headers, config) {
            alert("Oops! Algo ha salido mal. Reintenta en un momento");
        }

        $scope.httpSuccess = function(data, status, headers, config) {
            console.log(data);
            shoppingCart.refreshCartDetails();
            $scope.products = data.result;
            $scope.working = false;
        }

        $scope.init = function() {
           $scope.shoppingCart.refreshCartDetails();
        }

       

        $scope.enviarPedido = function() {
            $scope.working = true;
            var request = $http({
                method: "put",
                url: 'http://www.nakaoutdoors.com.ar/pedidos/carrito_index',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=PUT&data[Pedido][nombre]=' + $scope.nombre + '&data[Pedido][apellido]=' + $scope.apellido + '&data[Pedido][mail]=' + $scope.mail + '&data[Pedido][cod_area]=' + $scope.codArea + '&data[Pedido][celular]=' + $scope.celular + '&data[Pedido][tipo_seguro]=' + $scope.tipoSeguro + '&data[Pedido][forma_envio]=' + $scope.formaEnvio + '&data[Pedido][direccion]=' + $scope.direccion + '&data[Pedido][terminal]=' + $scope.terminal + '&data[Pedido][codigo_postal]=' + $scope.codigoPostal + '&data[Pedido][provincia_id]=' + $scope.provincia + '&data[Pedido][forma_pago]=' + $scope.formaDePago + '&data[Pedido][telefono]=' + $scope.telefono + '&data[Pedido][observaciones]=' + $scope.observaciones + '&data[Pedido][iva_facturacion]=' + $scope.ivaFacturacion + '&data[Pedido][razon_social]=' + $scope.razonSocial + '&data[Pedido][cuit]' + $scope.cuit + '&'

            });



            // Store the data-dump of the FORM scope.
            request.success(this.httpEnviarPedidoSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpEnviarPedidoError);

        }

        $scope.httpEnviarPedidoError = function(data, status, headers, config) {
            alert("Oops! Algo ha salido mal. Reintenta en un momento");
        }

        $scope.httpEnviarPedidoSuccess = function(data, status, headers, config) {
            alert("Su pedido fue enviado con exito");
            ons.navigator.popPage();
            $scope.working = false;
        }

        $scope.eliminarDelCarrito = function(id) {
            console.log('eliminando producto del carrito de compras');
            $scope.working = true;
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
            alert("Oops! Algo ha salido mal. Reintenta en un momento");
            $scope.working = false;
        }

        $scope.httpEliminarDelCarritoSuccess = function(data, status, headers, config) {
            console.log("Item eliminado con exito");
            $scope.shoppingCart.refreshCartDetails();
            $scope.working = false;
        }

    });
})();
