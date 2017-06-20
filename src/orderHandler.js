const inquirer = require('inquirer');

const output = {};
let addedItems = 0;

const addItem = (config) =>
  inquirer.prompt(config.productQuestions(addedItems)).then((answers) => {
    const {
      qty,
      product
    } = answers;

    switch (product) {
    case 'checkout':
      return output;
    case 'exit':
      console.log(config.byebye);
      return process.exit();
    default:
      addedItems += answers.qty;
      if (output[product]) {
        output[product] = output[product] + qty;
      } else {
        output[product] = qty;
      }
      return addItem(config);
    }
  });

module.exports = (config) =>
  () => {
    console.log(config.welcome);
    return addItem(config);
  };
