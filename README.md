# Patient Zero's Cheeseria Coding Challenge (For Juniors)

## Overview

**Cheese shopping cart.**<br />
The backend server is using .NET 5.0 and the frontend client is using Angular 10.<br />

## Requirements

1. When clicking on a Cheese card, open a [Dialog](https://material.angular.io/components/dialog/examples) that contains all the details of the card, including the item's **description**.
    
   - The cheese details like **description** and **category** can be viewed by clicking on cheese card. 

2. Add a **Purchase** button to the Cart (In the sliding view that opens when you click the 'View Cart' button). Clicking on the **Purchase** button will send all items in the cart to the server (backend) and store them for later use (You are not required to use a Database in this exercise, but you may do so if you wish).

  - After adding cheeses to the cart, click view cart to check the items added inside the cart. 
   Click **Purchase** button on the Cart to purchase all the items in the cart. The backend server will save all the purchased items in a JSON file. 

3. Show all recently purchased items when clicking on the "Recent Purchases" button on the top left of the page. You may choose to display those items in a Drawer, a Dialog or any other control you see fit. Note that the recent purchased items **must** be retrieved from the server.

  - Once Purhased, click on **Recent Purchases** button on the nav bar to view all the recently purchased   history.The data is saved in a JSON file and it is retrieved from the server. 

4. Add a UI automation test that performs the Purchase action you implemented as part of Feature #2. For this test case you will add two separate items to the cart and click on the **Purchase** button you have added as part of Feature #2.
For this exercise we will be using the Cypress.io tool-set. You will find code to get you started in the 'e2e' folder.
  - Added UI automation test for View Cheese Details, View Cart and Purchase Items, View Recently Purchased Cheese.
 
***Note: You are free to add any selectors to your client code which may be required by the e2e tests.***


## Important Scripts

In the client project directory, you can run:

### `npm install`

Installs package dependencies (using node v14.15.0)

### `npm start`

Builds and runs the app in the development mode.\
The browser will be ready under [http://localhost:4200](http://localhost:4200).

To run the server backend, see instructions in backend/README.md.

### Cypress.io

You will open the e2e folder, then run following commands to get started

```bash
npm install
npm test
```

### Helpful links

[React Material UI](https://material-ui.com/getting-started/usage/)