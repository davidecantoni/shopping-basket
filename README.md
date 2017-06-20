This is a simple shopping basket and receipt generator written in node.js

You can add products with the interactive command line user interface.

```
Hi, welcome to R3PI order bot
? What do you wanna add to your basket? Apples (0.25ct)
? How many apples do you wanna add? 4
? What do you wanna add to your basket? (Use arrow keys)
❯ Apples (0.25ct)
  Oranges (0.3ct)
  Bananas (0.15ct)
  Papayas (0.5ct) Three for the price of two
  ──────────────
  Checkout and print receipt
  Exit app
```

Once you are done you can also print the receipt.

```
                         
           GENOSSENSCHAFT MIGROS ZÜRICH
               M HAUPTBAHNHOF ZÜRICH
                TEL. 043 443 80 60
                        ---
                MO-FR: 06:30-22:00
                SA-SO: 08:00-22:00
                         

Order Number:   1448
Date:           2017-06-20
--------------------------------------------------
Qty  Product                                 Total
--------------------------------------------------
4    Apples (0.25ct)                      CHF 1.00

4    Oranges (0.3ct)                      CHF 1.20

2    Bananas (0.15ct)                     CHF 0.30

5    Papayas (0.5ct)                      CHF 2.50
       Three for the price of two        CHF -0.50
--------------------------------------------------

MWST (2.5%):                              CHF 0.11
Total amount (excl. MWST):                CHF 4.50
Total amount (incl. MWST):                CHF 4.61

                         
          THANK YOU FOR SHOPPING WITH US!
                         
            by Davide Cantoni june 2017
            
```

Install
=====

Download the repo and run

```npm install``` or ```npm yarn```


Usage
=====

Run the app with the following commands:

```npm start``` or ```yarn start```

You should be able to add the products easily via "interactive command line user interface" by using arrow keys.

Once you add enough products to the basket, select "Checkout and print receipt" which will print the receipt.

Config Settings
=====

In case you wanna change the price of the products or add products to the list, you can modify the configuration.

`src/config.js`

> TODO: list all available settings and explain their usage.

Additional commands
=====
Run the folowing command to run the tests for the price and tax calculator.

```npm test``` or ```yarn test```

> TODO: add more test coverage, especially for the receipt generator.


Run the following command to check the linting.
```npm run lint``` or ```yarn lint```

Inspiration
=====

For the receipt generator i got inspired by the following receipt.

![Imgur](http://i.imgur.com/8A5I92z.jpg)

