(function () {
  // was reinitialising the app which was conflicting
  angular.module("qudini.QueueApp").directive("customer", Customer);

  Customer.$inject = ["$http"];

  /**
   * The <customer> directive is responsible for:
   * - serving customer
   * - calculating queued time
   * - removing customer from the queue
   */
  function Customer($http) {
    return {
      restrict: "E",
      scope: {
        customer: "=",
        onRemoved: "&",
        onServed: "&",
      },
      templateUrl: "/customer/customer.html",
      link: function (scope) {
        // calculate how long the customer has queued for
        scope.queuedTime = new Date() - new Date(scope.customer.joinedTime);

        scope.remove = function () {
          $http
            .delete("/api/customer/remove", {
              params: {
                id: scope.customer.id,
              },
            })
            .then(function (res) {
              scope.onRemoved();
            });
        };
      },
    };
  }
})();
