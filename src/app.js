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
