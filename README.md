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
| Profile        | Register as new customer or sign in by email or Google account                                             |
| Admin          | Manage products, categories and users.                                                                     |

## Getting Started

1. Clone the repository using `git clone`;
2. Open the terminal and navigate to project folder.
3. Install packages and libraries. If you are using `npm`, run `npm install`. If you are using `yarn`, run `yarn install`.
4. Run the project using `npm start` or `yarn start`. The application will automatically open a browser window at the address [http://localhost:3000/](http://localhost:3000/)

## Requirements

### Basic requirements

The Front end project must use TypeScript and Redux toolkit.

1. Use the API endpoint `https://fakeapi.platzi.com/`.

2. Create at lease 4 pages (can be more if you want): Page for all products, product page, profile page (only available if user logins), and cart page (cart page could be a page or a modal)

3. Create Redux store for following features:

   - product reducer: get all products, find a single products, filter products by categories, sort products by price. Create, update and delete a product (enable update & delete features only for admin of the webapp)
   - user reducer: register and login
   - cart reducer: add product to cart, remove products, update products's quantity in cart

4. When adding routers to your application, set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.

5. Styling: must have responsive

6. Implement unit testing for the reducers

7. **Deploy** the application and rewrite README file.

### Additional features:

- Use Context API to switch theme
- Use pagination when fetching/displaying all the products
- Implement performance optimization where applicable

## Grading (1-5)

1: Late submission or not complete basic requirements

2: Basic requirement + Presentation

3: Folder structure + follow convention(naming convention ,loading, error) + some additional features

4: All additional features + reusable logic + custom hook

5: UI-UX (for example: send alert when user add same product) + styling (animation or transition, scroll to top) + advanced feature (google log in)

## Deadline

- Presentation: **7/3** and **8/3/ 2024**
- Submitting Front-end project **10am 8/3/2024**

Usage:
Scripts: List the available scripts in package.json like start, build, test, and what they do.
Features: Break down the main features of your application and how to use them.
Screenshots or GIFs: Visual aids can help users quickly understand what the project looks like in action.
Architecture & Design:
Folder Structure: Briefly explain the organization of important directories and files.
Data Flow: Describe how data flows in the application, especially if you’re using tools like Redux or Context API.
Component Structure: Explain the main components and their relationships, possibly using a diagram.
Testing:
Mention the testing libraries/frameworks used.
Explain how to run tests.
If applicable, describe the structure of your tests (unit, integration, end-to-end).
Deployment:
Detail the steps required for deploying the project to a server.
Mention any specific hosting platforms, CI/CD pipelines, or other tools used.
