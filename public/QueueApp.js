(function () {
  angular
    .module("qudini.QueueApp", [])
    .controller("QueueController", QueueController);

  QueueController.$inject = ["$scope", "$http"];

  /**
   * Bonus points - manipulating the without waiting for the
   * server request
   */
  function QueueController($scope, $http) {
    $scope.customers = [];
    $scope.customersServed = [];

    _getCustomers();
    _getServedCustomers();

    $scope.onCustomerAdded = function () {
      _getCustomers();
    };

    $scope.onCustomerRemoved = function () {
      _getCustomers();
    };

    $scope.onCustomerServed = function () {
      _getCustomers();
      _getServedCustomers();
    };

    function _getServedCustomers() {
      return $http.get("/api/customers/served").then(function (res) {
        $scope.customersServed = res.data;
      });
    }

    function _getCustomers() {
      return $http.get("/api/customers").then(function (res) {
        $scope.customers = res.data;
      });
    }
  }
})();
