const apiURL = 'https://fakestoreapi.com/products';

export const getProducts = () =>
  fetch(apiURL).then((response) => response.json());

export const getCategories = () =>
  fetch(`${apiURL}/categories`).then((response) => response.json());

export const getProductsByCategory = (category) =>
  fetch(`${apiURL}/category/${category}`).then((response) => response.json());
