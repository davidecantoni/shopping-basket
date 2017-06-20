// receipt specific configuration
const configReceipt = {
  invoiceWidth: 50,
  tax: 2.50,
  dateWidth: 15,
  taxWidth: 40,
  qtyWidth: 5,
  productWidth: 34,
  totalWidth: 11,
  text: {
    currency: 'CHF',
    cent: 'ct',
    gst: 'MWST',
    orderNumber: 'Order Number',
    date: 'Date',
    qty: 'Qty',
    product: 'Product',
    total: 'Total',
    gstAmount: '%s (%d%)',
    totalAmountExcl: 'Total amount (excl. %s)',
    totalAmountIncl: 'Total amount (incl. %s)',
    header: `
      GENOSSENSCHAFT MIGROS ZÜRICH
      M HAUPTBAHNHOF ZÜRICH
      TEL. 043 443 80 60
      ---
      MO-FR: 06:30-22:00
      SA-SO: 08:00-22:00
    `,
    footer: `
      THANK YOU FOR SHOPPING WITH US!

      by Davide Cantoni june 2017
    `
  }
};

// available products
const products = [
  {
    key: 'apples',
    name: 'Apples',
    price: 0.25
  }, {
    key: 'oranges',
    name: 'Oranges',
    price: 0.30
  }, {
    key: 'bananas',
    name: 'Bananas',
    price: 0.15
  }, {
    key: 'papayas',
    name: 'Papayas',
    discount: {
      label: 'Three for the price of two',
      calc: (qty) => Math.floor(qty/3)
    },
    price: 0.5
  }
];

const welcome = 'Hi, welcome to R3PI order bot';
const byebye = 'sad to see you go...';

// inquiry wizard
const productQuestions = (addedItems) => {
  const choices = products.map(product => ({
    name: `${product.name} (${product.price}${configReceipt.text.cent}) ${product.discount ? product.discount.label : ''}`,
    value: product.key
  }));

  choices.push({ type: 'separator', line: '\u001b[2m──────────────\u001b[22m' });
  if (addedItems > 0) {
    choices.push({ name: 'Checkout and print receipt', value: 'checkout' });
  }
  choices.push({ name: 'Exit app', value: 'exit' });

  return [
    {
      type: 'list',
      name: 'product',
      message: 'What do you wanna add to your basket?',
      choices: choices
    }, {
      type: 'input',
      name: 'qty',
      message: (answers) => `How many ${answers.product} do you wanna add?`,
      validate: function (value) {
        var valid = !isNaN(parseFloat(value)) && value > 0;
        return valid || 'Please enter a number greater than 0';
      },
      when: (answers) => answers.product !== 'checkout' && answers.product !== 'exit',
      filter: Number
    }
  ];
};

module.exports = {
  configReceipt,
  products,
  productQuestions,
  welcome,
  byebye
};
