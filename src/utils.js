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

export const addProduct = ({
  name,
  barCode,
  manufacturer,
  category,
  price
}) => fetch(
  `${BASE_URL}/products/create`,
  {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      barCode,
      manufacturer,
      category,
      price: parseFloat(price)
    })
  }
)

export const getProductBatches = productId => fetch(
  `${BASE_URL}/batches/product/${productId}`,
  {
    method: 'get'
  }
)

export const addProductBatch = (productId, batch) => {
  const { quantity, expirationDate } = batch
  return fetch(
    `${BASE_URL}/batches/create/?productId=${productId}&quantity=${quantity}&expirationDate=${expirationDate}`,
    {
      method: 'post'
    }
  )
}

export const deleteProductBatch = batchId => fetch(
  `${BASE_URL}/batches/delete/${batchId}`,
  {
    method: 'delete'
  }
)

export const updateProduct = (product, token) => fetch(
  `${BASE_URL}/products/${product.id}`, {
    method: 'put',
    headers: {
      // Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product)
  }
)

export const getMissingProducts = token => fetch(
  `${BASE_URL}/products/unavailable`, {
    method: 'get',
    // headers: {
    //   Authorization: token,
    // }
  }
)

export const getLowStockProducts = token => fetch(
  `${BASE_URL}/products/lowStock`,
  {
    method: 'get',
    // headers: {
    //   Authorization: token,
    // }
  }
)

export const getAlmostExpiredBatches = token => fetch(
  `${BASE_URL}/batches/toExpire`, {
    method: 'get'
  }
)

export const getDiscounts = token => fetch(
  `${BASE_URL}/discounts`, {
    method: 'get',
  }
)

export const addDiscount = (discount, token) => fetch(
  `${BASE_URL}/discount/create`, {
    method: 'post',
    headers: {
      "Content-Type": "application/json; charset=utf8"
    },
    body: JSON.stringify(discount)
  }
)

export const getAdmins = () => fetch(
  `${BASE_URL}/user/admins`
)

export const getClients = () => fetch(
  `${BASE_URL}/user/clients`
)

export const getEmployees = () => fetch(
  `${BASE_URL}/user/admins`
)

export const deleteUser = id => fetch(
  `${BASE_URL}/user/delete/${id}`, {
    method: 'delete'
  }
)

export const createUser = user => fetch(
  `${BASE_URL}/user/create`, {
    method: 'post',
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    }
  })

export const getProduct = id => fetch(
  `${BASE_URL}/products/${id}`, {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
    }
  }
)