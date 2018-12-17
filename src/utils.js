export const BASE_URL = 'https://cccpharma-back.herokuapp.com'

export const getToken = cookies => cookies && cookies.get('ccc-pharma-token')

export const getCurrentUser = token => fetch(
  `${BASE_URL}/user/loggedUser`,
  {
    method: 'get',
    headers: {
      Authorization: token
    }
  }
)

export const getProducts = (category = 'TODOS') => fetch(
  `${BASE_URL}/products${category !== 'TODOS' ? `/category/${category}` : '/'}`,
  {
    method: 'get'
  }
)

export const addProduct = product => fetch(
  `${BASE_URL}/products/create`,
  {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  }
)
