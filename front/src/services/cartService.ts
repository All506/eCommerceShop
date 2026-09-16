interface AddCartItemRequest {
  cartId: number;
  shoeId: number;
  sizeId: number;
  quantity: number;
}

export const addCartItem = async (
  item: AddCartItemRequest
) => {
  const response = await fetch(
    `${import.meta.env.BASE_URL}api/cart/items`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }
  );

  if (!response.ok) {
    throw new Error('Error agregando producto al carrito');
  }

  return response.json();
};