const { taxCalculator, priceCalculator } = require('../src/priceCalculator');

describe('Tax calculator', () => {

  describe('on tax calculation', () => {
    it('should fail if no tax object has been provided', () => {
      assert.throws(() => taxCalculator(null, null), 'Please provide a tax object with the property sum');
    });

    it('should fail if no tax has been provided', () => {
      assert.throws(() => taxCalculator({ sum: 1 }, null), 'Please provide the tax value');
    });

    it('should calculate the tax correctly', () => {
      const { tax, sum, incl } = taxCalculator({ sum: 100 }, 2.5);
      assert.equal(tax, '2.50', 'tax value is wrong');
      assert.equal(sum, '100.00', 'sum is wrong');
      assert.equal(incl, '102.50', 'sum incl. tax is wrong');
    });
  });

  describe('on price calculation', () => {

    before(() => {
      this.products = [
        {
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
    });

    it('should fail if no basket object has been provided', () => {
      assert.throws(() => priceCalculator(null, null), 'Please provide a valid basket object');
    });

    it('should fail if no product configuration has been provided', () => {
      assert.throws(() => priceCalculator({}, null), 'Please provide a valid product configuration with at least one product');
    });

    it('should return items with a proper structure', () => {
      const qty = 6;
      const { items } = priceCalculator({ papayas: qty }, [this.products[1]]);

      const [, { name, discount: { label, calc }, price }] = this.products;
      assert.deepEqual(items, [
        {
          name,
          price,
          qty,
          total: (qty * price).toFixed(2),
          discount: {
            label,
            total: (calc(qty) * price).toFixed(2)
          }
        }
      ], 'item properties are wrong');
    });

    it('should calculate the price correctly', () => {
      const { tax } = priceCalculator({ bananas: 10, papayas: 1 }, this.products);
      assert.equal(tax.sum, '2', 'sum is wrong');
    });

    it('should calculate the price correctly even if there is a discounted product', () => {
      const { tax } = priceCalculator({ papayas: 6 }, this.products);
      assert.equal(tax.sum, '2', 'sum is wrong');
    });
  });
});
