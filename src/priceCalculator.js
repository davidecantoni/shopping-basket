const numberToString = (number) => parseFloat(number, 10).toFixed(2);
const stringToFloat = (string) => parseFloat(string, 10);

const priceCalculator = (basketItems, productConfig) => {
  if (!basketItems) {
    throw new Error('Please provide a valid basket object');
  }

  if (!(productConfig && productConfig.length > 0)) {
    throw new Error('Please provide a valid product configuration with at least one product');
  }

  let sum = 0;

  const items = productConfig.reduce((col, product) => {
    const item = basketItems[product.key];

    if (item) {
      let total = item * product.price;
      let discountData = null;
      sum = sum + total;

      if (product.discount) {
        const discount = product.discount.calc(item) * product.price;
        sum = sum - discount;
        discountData = {
          label: product.discount.label,
          total: numberToString(discount)
        };
      }

      col.push({
        qty: item,
        name: product.name,
        total: numberToString(total),
        price: product.price,
        discount: discountData
      });
    }
    return col;
  }, []);

  return {
    items,
    tax: {
      sum
    }
  };
};

const taxCalculator = (data, tax) => {
  if (!(data && data.sum)) {
    throw new Error('Please provide a tax object with the property sum');
  }

  if (!tax) {
    throw new Error('Please provide the tax value');
  }

  const t = stringToFloat(data.sum) / 100 * stringToFloat(tax);
  const taxAmount = numberToString(t);
  return {
    tax: taxAmount,
    sum: numberToString(data.sum),
    incl: numberToString(data.sum + stringToFloat(taxAmount))
  };
};

const priceAndTaxCalculator = (basketItems, productConfig, tax) => {
  const result = priceCalculator(basketItems, productConfig);
  result.tax = taxCalculator(result.tax, tax);
  return result;
};

module.exports = {
  priceCalculator,
  taxCalculator,
  priceAndTaxCalculator
};
