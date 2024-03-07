# E-commerce Website

This project is a website of an e-commerce business using fake data from the API [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/). It allows users to search products, add items to wishlist and cart, review the cart. It also allows admin roles to manage the products (creating new items, updating or deleting items.)

## Contents:

| Section        | Description                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| Home           | A brief view of highlighted features                                                                       |
| Products       | Fetch data from the API and display them. Items can be filtered by category and price and sorted by price. |
| Product Detail | Display the description, photos, price, etc,. of the product.                                              |
| Categories     | Classify product in different categories                                                                   |
| Wishlist       | Users can store items to their list.                                                                       |
| Cart           | Preview the order before checkout or update the items in cart.                                             |
| Profile        | Register as new customer or sign in by email or Google account.                                            |
| Admin          | Manage products, categories and users.                                                                     |

## Getting Started

1. Clone the repository using `git clone`;
2. Open the terminal and navigate to project folder.
3. Install packages and libraries. If you are using `npm`, run `npm install`. If you are using `yarn`, run `yarn install`.
4. Replace the apiKey in `index.tsx` with your key.
5. Run the project using `npm start` or `yarn start`. The application will automatically open a browser window at the address [http://localhost:3000/](http://localhost:3000/)

## Usage

#### Scripts

`"start": "react-scripts start"`, runs the development server.

`"build": "react-scripts build"`,bundles the app into static files for production.

`"test": "react-scripts test --transformIgnorePatterns 'node_modules/(?!@codemirror)/' --coverage"`, launches the test runner in interactive watch mode. Additionally, it ensures that test coverage is calculated,

`"eject": "react-scripts eject"`, moves the create-react-app configuration and scripts into the project, providing full control over them.

`"test-coverage": "jest --coverage"`, executes Jest tests and generates coverage reports.

#### Features

1.  Fetch products data from the API and display the items.
    ![products](./src/images/screenshots/products.png)
2.  Filter products by category and price.
    ![filter](./src/images/screenshots/productFilter.png)
3.  Sort data by price in ascending/descending order.
    ![sorter](./src/images/screenshots/productSorting.png)
4.  Search for items by keyword and/or a specific category.
    ![search](./src/images/screenshots/search.png)
5.  Browser detailed information of a product.
    ![details](./src/images/screenshots/productDetail.png)
6.  Add products to wishlist from either the product list or the product details page by clicking the heart button. Remove a product from wishlist by clicking the trash button at the left-top corner.  
    ![delete from wishlist](./src/images/screenshots/deleteWishlistItem.png)
7.  Add items to cart from the entire list, wishlist or product details page. The number of items in wishlist and cart will be displayed on the Badges of icons.
    ![badge](./src/images/screenshots/badge.png)
8.  Preview cart by a drawer popped over from right in which editing the products and their numbers are allowed.
    ![cart drawer](./src/images/screenshots/cartDrawer.png)
9.  In cart page, it's also welcomed to change the product's number. If the delete button is clicked or the number of product is reduced to 0, a Modal will pop out requesting for confirmation.
    ![cart](./src/images/screenshots/cart.png)
    ![popover](./src/images/screenshots/deletePopover.png)
10. Checkout button will lead to login (if not yet), the user can login by email, by Google account, or register a new account.
11. Both login and register form have to be validated, which is implemented by `Formik` and `Yup`. Besides,the email and the avatar must pass the API endpoints.
    ![register](./src/images/screenshots/register.png)
    ![alert](./src/images/screenshots/avatarAlert.png)
12. When a "admin" role logs in, it's allowed to created/update/delete items.
13. Click the button to toggle light/dark mode, which is achieved by `React's Context` and `Material UI`'s customered theme.
    ![create](./src/images/screenshots/create.png)
14. Responsive layout is build with `Tailwindcss`.
15. `React-scroll-to-top` is used to enable uses to reach the page top view smoothly.

## Architecture & Design

#### Pages & Components

```
src/
|-- components/
|   |-- product/
|   |   |-- ProductCard
|   |   |-- ProductFilters
|   |   |-- ProductPagination
|   |   |-- ProductSort
|   |   |-- ProductFilter
|   |   |-- shared/
|   |       |-- ProductImage
|   |       |-- ProductInfoInCard
|   |       |-- CartButton
|   |       |-- HeartButton
|   |-- user/
|   |   |-- UserProfile
|   |   |-- UserLogin
|   |   |-- UserRegister
|   |   |-- UserLogoutButton
|   |-- admin/
|   |   |-- ProductCreation
|   |   |-- ProductUpdateOrDelete
|   |-- cart/
|   |   |-- CartDrawer
|   |   |-- ProductCardInCart
|   |   |-- ProductsInCart
|   |-- category/
|   |   |-- Categories
|   |   |-- CategoryCard
|   |-- search/
|   |   |-- SearchForm
|-- pages/
|   |-- Home
|   |-- Admin
|   |-- Cart
|   |-- Me
|   |-- Products
|   |-- SingleProduct
|   |-- WishList
```

I broke components into small pieces. For example, the diagram below illustrates the how Products page is structured.
![structure](./src//images/screenshots/componentStructure.png)
To enable the components to access states, I use `Redux` store to pool them. For example, by clicking the cart button from products page, wishlist page, a single product details page, and the trash button in cart drawer, `itemsInCart` state can be updated. Then, other components like the badge of cart button can select the state from the store.

In addition, I use customered hooks to fetch data of a single product and to handle repeated dispatching actions specifically `ddToCart(item)` and `addToWishList(item)`.
Commonly used types, style and functions are exported from misc folder.

## Testing

#### Libraries

[Jest](https://jestjs.io/) is used for unit testing and [mswjs](https://mswjs.io/) for server mocking. By simply run `yarn test`, you can observe the test results dynamically.

For this project, I have implemented unit testing for the reducers.
![test result](./src/images/screenshots/test.png)

## Deployment

The project is deployed on Github Pages. [https://monodara.github.io/Ecommerce-Web-with-API/](https://monodara.github.io/Ecommerce-Web-with-API/)
