const localhost = "http://localhost:5074/api/v1/";
// products
export const productsEndpoint = `${localhost}products/`;
export const topRatedProductUrl = `${productsEndpoint}top_rated/4`;
export const mostPurchasedProductUrl = `${productsEndpoint}most_purchased/4`;
//auth
export const loginUrl = `${localhost}auth/login`;

// users
export const userEndpoints = `${localhost}users/`;
export const checkEmailUrl = `${userEndpoints}check-email`
export const userProfileUrl = `${userEndpoints}profile`;
