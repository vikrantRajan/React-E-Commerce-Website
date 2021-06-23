# JIBE FE Take-Home Exercise

💫 Welcome to the JIBE FE take-home coding exercise! 🎉

This front-end exercise is designed to take about 4 hours for someone familiar with React/Node/Express. It involves building a storefront in React that also makes a couple of requests to the Node.js/Express.js backend.

## Getting Set Up

The exercise requires [Node.js](https://nodejs.org/en/) to be installed. We recommend using the LTS version.

## Quick Start

```bash
# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)
```

❗️ **Make sure you commit all changes to the master branch!**

## Technical Notes

- The server is running with [nodemon](https://nodemon.io/) which will automatically restart for you when you modify and save a file.
- The frontend was bootstrapped with [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
- There is no database, we're using local seed data that has been pre-generated for this exercise.
- Feel free to use what you think is best for the task given (routers, API clients, test framework, ..) 
- The server is running on port 5424 and all AJAX requests from the frontend will automatically proxy to that endpoint. For instance, you can `fetch('/api/username')` and it will automatically hit `localhost:5424/api/username`.

## API Spec

There's 3 endpoints available on the API:

1. `/api/username`: returns current system username; 

2. `/api/products`: returns list of products; uses query parameters to expose the 3 filters available, `category`, `size` and `color`

3. `/api/products/:productId`: returns detailed information for the product with the specified `productId`

## Acceptance Criteria

Below is a list of user stories corresponding to our acceptance criteria.

1. I can browse a list of all products available in the store.

2. I can filter the products list using Category, Size and Color filters that leverage the API to filter the collection.

3. I can sort the products by price even though the API doesn't provide that functionality.

4. Clicking on a product takes me to a Product Detail Page (PDP) with all the info and images for the product.

5. I can add a product currently in stock to cart, which is stored locally on my browser.

6. I can view products currently in my cart with quantities and price.

## Going Above and Beyond the Requirements

Given the time expectations of this exercise, we don't expect anyone to submit anything super fancy, but if you find yourself with extra time, any extra credit item(s) that showcase your unique strengths would be awesome! 🙌

## Submitting the Assignment

When you have finished the assignment send us the link to the repo (or a zip file) and we'll review your code within 1-2 days.

Thank you and good luck! 🙏
