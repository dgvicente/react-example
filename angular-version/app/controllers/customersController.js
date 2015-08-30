(function() {

    var CustomersController = function($scope, $http) {
        $http.get('app/customers.json').success(function(data) {
            $scope.customers = data.customers;
        });

        $scope.deleteCustomer = function(customer) {
            var index = $scope.customers.indexOf(customer);
            $scope.customers.splice(index, 1);
            $scope.$emit('customerDeleted', customer);
        };
    };

    CustomersController.$inject = ['$scope', '$http'];

    angular.module('customersApp').controller('CustomersController', CustomersController);

}());