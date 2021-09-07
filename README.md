## Quick Start

```bash
# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)
```
## API Spec

There's 3 endpoints available on the API:

1. `/api/username`: returns current system username; 

2. `/api/products`: returns list of products; uses query parameters to expose the 3 filters available, `category`, `size` and `color`

3. `/api/products/:productId`: returns detailed information for the product with the specified `productId`

## Feature List

Below is a list of user features.

1. I can browse a list of all products available in the store.

2. I can filter the products list through a combination of words entered in a Search Bar and/or Category, Size, Color & Price filters.

3. Clicking on a product takes me to a Product Detail Page (PDP) with all the info and images for the product.

4. I can add a product currently in stock to cart, which is stored locally on my browser.

5. I can view products currently in my cart with quantities and price.

6. The filter options should not be available on a single Product Detail Page. It should only be seen on the Product List Page.

