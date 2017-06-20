const ReceiptGenerator = require('./receiptGenerator');
const orderhandler = require('./orderHandler');
const { priceAndTaxCalculator } = require('./priceCalculator');
const {
  configReceipt,
  products,
  productQuestions,
  welcome,
  byebye
} = require('./config');

// start
const order = orderhandler({
  productQuestions,
  welcome,
  byebye
});

// get readable stream
const receipt = new ReceiptGenerator(configReceipt);

// start ordering and then print receipt
order()
  .then((basketData) => {
    receipt.generateReceipe(priceAndTaxCalculator(basketData, products, configReceipt.tax));
    receipt.pipe(process.stdout);
  })
  .catch(err => console.error(err));

// const lines = string.split('\n');

// function* foo() {
//   var index = 0;
//   while (index <= lines.length)
//     yield index++;
// }

// var iterator = foo();

// const timeout = setInterval(() => {
//   const { value, done } = iterator.next();
//   console.log(lines[value]);
//   if (done) {
//     clearInterval(timeout);
//   }
// }, 50);
