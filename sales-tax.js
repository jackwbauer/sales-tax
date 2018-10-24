var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

function calculateSalesTax(salesData, taxRates) {
  var results = {};
  for(var instance in companySalesData) {
    var data = companySalesData[instance];
    if(results[data.name] === undefined) {
      results[data.name] = {
        totalSales : calculateTotalSales(data.sales),
        totalTaxes : calculateTotalTax(data.sales, taxRates[data.province])
      };
    } else {
      results[data.name].totalSales += calculateTotalSales(data.sales);
      results[data.name].totalTaxes += calculateTotalTax(data.sales, taxRates[data.province]);
    }
  }
  return results;
}

function calculateTotalSales(sales) {
  return sales.reduce(add, 0);
}

function calculateTotalTax(sales, taxRate) {
  return sales.reduce(add, 0) * taxRate;
}

function add(a, b) {
  return a + b;
}
var results = calculateSalesTax(companySalesData, salesTaxRates);

/* Expected Results:
{
  Telus: {
    totalSales: 1300
    totalTaxes: 144
  },
  Bombardier: {
    totalSales: 800,
    totalTaxes: 40
  }
}
*/