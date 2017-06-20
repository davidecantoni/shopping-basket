const { Readable } = require('stream');
const util = require('util');

const EOL = '\n';
const SPACE = '\xa0';

class ReceiptGenerator extends Readable {
  constructor(config) {
    super();
    this._setConfig(config);
  }

  _read() {}

  _setConfig(config) {
    // perform some validation
    this.config = config;
  }

  generateReceipe(data) {
    const { invoiceWidth } = this.config;
    const { items=false, tax=false } = data;

    // header
    this._processTextLines(this.config.text.header);

    this.streamLine('');

    // no & date
    this._subHeader();

    // listing
    const line = this._getChar(invoiceWidth, '-');
    this.streamLine(line);
    this._listingHeader();
    this.streamLine(line);

    if (items) {
      this._listingContent(items);
      this.streamLine(line);
    }

    // tax
    if (items && tax) {
      this.streamLine('');
      this._tax(tax);
    }

    this.streamLine('');

    // footer
    this._processTextLines(this.config.text.footer);

    // everything done, close stream
    this.streamLine(EOL);
  }

  _subHeader() {
    const { dateWidth, text: { orderNumber, date } } = this.config;

    // print order number
    const order = this._getRandomInt(1000, 2000);
    this.streamLine(
      `${orderNumber}:${this._getChar(dateWidth - orderNumber.length)}${order}`
    );

    // print date
    const formatedDate = new Date().toISOString().substring(0,10);
    this.streamLine(
      `${date}:${this._getChar(dateWidth - date.length)}${formatedDate}`
    );
  }

  _listingHeader() {
    const {
      qtyWidth,
      productWidth,
      totalWidth,
      text: {
        qty, product, total
      }
    } = this.config;

    this.streamLine(
      `${qty}${this._getChar(qtyWidth - qty.length)}` +
      `${product}${this._getChar(productWidth - product.length)}` +
      `${this._getChar(totalWidth - total.length)}${total}`
    );
  }

  _listingContent(data) {
    const {
      invoiceWidth,
      qtyWidth,
      productWidth,
      totalWidth,
      text: {
        cent,
        currency
      }
    } = this.config;

    // print line
    data.forEach((item, index) => {
      const itemDescription = `${item.name} (${item.price}${cent})`;
      this.streamLine(
        `${item.qty}${this._getChar(qtyWidth - item.qty.toString().length)}` +
        `${itemDescription}${this._getChar(productWidth - itemDescription.length)}` +
        `${this._getChar(totalWidth - item.total.length - currency.length - 1)}${currency} ${item.total}`
      );

      if (item.discount) {
        const text = `${this._getChar(7)}${item.discount.label}`;
        this.streamLine(
          `${text}${this._getChar(invoiceWidth - text.length - item.discount.total.length - currency.length - 2)}${currency} -${item.discount.total}`
        );
      }

      // print line
      if (index < data.length - 1) {
        this.streamLine('');
      }
    });
  }

  _tax(data) {
    const { tax: taxAmount, sum, incl } = data;
    const { tax, taxWidth, text: { gst, gstAmount, currency, totalAmountExcl, totalAmountIncl } } = this.config;

    // print gst
    const g = util.format(
      gstAmount,
      gst,
      tax
    );
    this.streamLine(
      `${g}:${this._getChar(taxWidth - g.length + 1)}${currency} ${taxAmount}`
    );

    // print excl
    const e = util.format(
      totalAmountExcl,
      gst
    );
    this.streamLine(
      `${e}:${this._getChar(taxWidth - e.length + 1)}${currency} ${sum}`
    );

    // print incl
    const i = util.format(
      totalAmountIncl,
      gst
    );
    this.streamLine(
      `${i}:${this._getChar(taxWidth - i.length + 1)}${currency} ${incl}`
    );
  }

  streamLine(string) {
    if (string === null) {
      return this.push(string);
    }

    this.push(string + EOL, 'utf8');
  }

  _processTextLines(text) {
    // go through each line and stream it to stdout
    text.split(EOL).forEach(line => {
      this.streamLine(this._centerText(line.trim()));
    });
  }

  _getRandomInt(min, max) {
    const m = Math.ceil(min);
    return Math.floor(Math.random() * (Math.floor(max) - m)) + m;
  }

  _getChar(number, char = SPACE) {
    let space = '';
    for (let i = 1; i<=number; i++) {
      space += char;
    }
    return space;
  }

  _centerText(text) {
    return util.format(`${this._getChar(Math.round((this.config.invoiceWidth - text.length) / 2))}%s`, text);
  }
}

module.exports = ReceiptGenerator;
