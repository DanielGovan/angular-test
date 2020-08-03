(function () {
  angular.module("qudini.QueueApp").directive("addCustomer", AddCustomer);

  AddCustomer.$inject = ["$http"];

  function AddCustomer($http) {
    return {
      restrict: "E",
      scope: {
        onAdded: "&",
      },
      templateUrl: "/add-customer/add-customer.html",
      link: function (scope) {
        scope.products = [
          { name: "Grammatical advice" },
          { name: "Magnifying glass repair" },
          { name: "Cryptography advice" },
        ];

        scope.add = function () {
          if (!scope.product || !scope.name) {
            //if form is incomplete do nothing
            return null;
          }
          // add a customer with name and product.
          // eg {
          // 	id: uuid.v4(),
          // 	name: "William Shakespeare",
          // 	product: { name: "Grammatical advice" },
          // 	joinedTime: new Date().toString(),
          //   },
          //do we need a time?
          //console.log(scope, scope.name, scope.product);
          $http
            .post("/api/customer/add", {
              name: scope.name,
              product: scope.product,
            })
            .then(function (res) {
              // clears name on submit
              scope.name = null;
              scope.onAdded();
            });
        };
      },
    };
  }
})();
