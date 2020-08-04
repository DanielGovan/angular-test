var uuid = require("node-uuid");
var serveStatic = require("node-static");
var fileServer = new serveStatic.Server("./public");
var express = require("express");
var bodyParser = require("body-parser");
var compileSass = require("express-compile-sass");
var root = "./public";

var customers = [
  {
    id: uuid.v4(),
    name: "William Shakespeare",
    product: { name: "Grammatical advice" },
    joinedTime: new Date().toString(),
  },
  {
    id: uuid.v4(),
    name: "Sherlock Holmes",
    product: { name: "Magnifying glass repair" },
    joinedTime: new Date().toString(),
  },
  {
    id: uuid.v4(),
    name: "Alan Turing",
    product: { name: "Cryptography advice" },
    joinedTime: new Date().toString(),
  },
];

var servedCustomers = [];

function serveCustomer(id) {
  customers = customers.filter(function (customer) {
    if (customer.id === id) {
      customer.status = "served";
      servedCustomers.push(customer);
      return false;
    } else {
      return true;
    }
  });
}

function addCustomer(customer) {
  customer.id = uuid.v4();
  customers.push(customer);
}

function removeCustomer(targetCustomerId) {
  customers = customers.filter(function (customer) {
    return customer.id !== targetCustomerId;
  });
}

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/customers", function (req, res) {
  res.send(customers);
});
app.get("/api/customers/served", function (req, res) {
  res.send(servedCustomers);
});
app.post("/api/customer/add", function (req, res) {
  addCustomer(req.body);
  res.end("Customer was added!");
});
app.put("/api/customer/serve", function (req, res) {
  serveCustomer(req.body.id);
  res.end("Customer was served!");
});
app.delete("/api/customer/remove", function (req, res) {
  removeCustomer(req.query.id);
  res.end("Customer was removed!");
});

app.use(
  compileSass({
    root: root,
    sourceMap: true, // Includes Base64 encoded source maps in output css
    sourceComments: true, // Includes source comments in output css
    watchFiles: true, // Watches sass files and updates mtime on main files for each change
    logToConsole: false, // If true, will log to console.error on errors
  })
);

app.use(function (req, res) {
  req
    .addListener("end", function () {
      fileServer.serve(req, res);
    })
    .resume();
});

app.listen(1337);
console.log("Server is running @ 127.0.0.1:1337...");
console.log("Good luck!");
