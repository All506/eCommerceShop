import { http, HttpResponse, delay } from 'msw';

// Shoe information
const shoes = [
  { id: 1, brand: 'Adidas', model: 'Samba', price: 145, img: 'https://siman.vtexassets.com/arquivos/ids/5885735-1600-auto?v=638792020024830000&width=1600&height=auto&aspect=true' },
  { id: 2, brand: 'Nike', model: 'Air', price: 220, img: 'https://shoelab.cr/wp-content/uploads/2024/05/cw2288-111_1.jpg' },
  { id: 3, brand: 'Nike', model: 'CourtVision', price: 120, img: 'https://www.sportline.cr/media/catalog/product/d/h/dh2987-109_phsrh000-1000.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:&format=jpeg', sale: 10 },
  { id: 4, brand: 'Converse', model: 'AllStar', price: 140, img: 'https://shoelab.cr/wp-content/uploads/2025/10/m7650c_1.jpg' },
  { id: 5, brand: 'Adidas', model: 'Campus 00', price: 160, img: 'https://shoelab.cr/wp-content/uploads/2024/10/hq8707_1.jpg', sale: 25 },
]

// Relation shoe to images
const images = [
  {
    id: 1,
    link: 'https://siman.vtexassets.com/arquivos/ids/5885735-1600-auto?v=638792020024830000&width=1600&height=auto&aspect=true'
  },
  {
    id: 1,
    link: 'https://img01.ztat.net/article/spp-media-p1/6a4d48452f3b47e8b355b3208e737974/4eccbfc0b4cd40879461e7efa059035f.jpg?imwidth=1800'
  },
  {
    id: 1,
    link: 'URL_IMAGEN_SAMBA_3'
  },
  {
    id: 2,
    link: 'https://shoelab.cr/wp-content/uploads/2024/05/cw2288-111_1.jpg'
  },
  {
    id: 2,
    link: 'https://shoelab.cr/wp-content/uploads/2024/05/cw2288-111_2.jpg'
  },
  {
    id: 2,
    link: 'https://shoelab.cr/wp-content/uploads/2024/05/cw2288-111_3.jpg'
  },
  {
    id: 3,
    link: 'https://www.sportline.cr/media/catalog/product/d/h/dh2987-109_phsrh000-1000.png?optimize=medium&bg-color=255,255,255&fit=bounds&format=jpeg'
  },
  {
    id: 3,
    link: 'https://cms.blumewebsites.com/cachosasociacion/products/10NKDH2987100-WHITE/WHITE/WHITE/10NKDH2987_100-WHITE@WHITE@WHITE_8.webp?v=133728802174815044'
  },
  {
    id: 3,
    link: 'https://cms.blumewebsites.com/cachosasociacion/products/10NKDH2987100-WHITE/WHITE/WHITE/10NKDH2987_100-WHITE@WHITE@WHITE_6.webp?v=133728802137939703'
  },
  {
    id: 4,
    link: 'https://shoelab.cr/wp-content/uploads/2025/10/m7650c_1.jpg'
  },
  {
    id: 4,
    link: 'https://shoelab.cr/wp-content/uploads/2025/10/m7650c_2.jpg'
  },
  {
    id: 4,
    link: 'https://shoelab.cr/wp-content/uploads/2025/10/m7650c_3.jpg'
  },
  {
    id: 5,
    link: 'https://shoelab.cr/wp-content/uploads/2024/10/hq8707_1.jpg'
  },
  {
    id: 5,
    link: 'https://shoelab.cr/wp-content/uploads/2024/10/hq8707_2.jpg'
  },
  {
    id: 5,
    link: 'https://shoelab.cr/wp-content/uploads/2024/10/hq8707_3.jpg'
  }
];

// Sizes Available
const sizes = [
  { id: 1, value: 38 },
  { id: 2, value: 39 },
  { id: 3, value: 40 },
  { id: 4, value: 41 },
  { id: 5, value: 42 },
  { id: 6, value: 43 },
];

const shoeSizes = [
  // Adidas Samba - shoeId 1
  { id: 1, shoeId: 1, sizeId: 1, stock: 5 },
  { id: 2, shoeId: 1, sizeId: 2, stock: 3 },
  { id: 3, shoeId: 1, sizeId: 3, stock: 8 },
  { id: 4, shoeId: 1, sizeId: 4, stock: 2 },
  { id: 5, shoeId: 1, sizeId: 5, stock: 6 },
  { id: 6, shoeId: 1, sizeId: 6, stock: 0 },

  // Nike Air - shoeId 2
  { id: 7, shoeId: 2, sizeId: 1, stock: 2 },
  { id: 8, shoeId: 2, sizeId: 2, stock: 4 },
  { id: 9, shoeId: 2, sizeId: 3, stock: 1 },
  { id: 10, shoeId: 2, sizeId: 4, stock: 7 },
  { id: 11, shoeId: 2, sizeId: 5, stock: 3 },
  { id: 12, shoeId: 2, sizeId: 6, stock: 5 },

  // Nike CourtVision - shoeId 3
  { id: 13, shoeId: 3, sizeId: 1, stock: 4 },
  { id: 14, shoeId: 3, sizeId: 2, stock: 2 },
  { id: 15, shoeId: 3, sizeId: 3, stock: 6 },
  { id: 16, shoeId: 3, sizeId: 4, stock: 1 },
  { id: 17, shoeId: 3, sizeId: 5, stock: 0 },
  { id: 18, shoeId: 3, sizeId: 6, stock: 3 },

  // Converse AllStar - shoeId 4
  { id: 19, shoeId: 4, sizeId: 1, stock: 3 },
  { id: 20, shoeId: 4, sizeId: 2, stock: 5 },
  { id: 21, shoeId: 4, sizeId: 3, stock: 2 },
  { id: 22, shoeId: 4, sizeId: 4, stock: 8 },
  { id: 23, shoeId: 4, sizeId: 5, stock: 4 },
  { id: 24, shoeId: 4, sizeId: 6, stock: 0 },

  // Adidas Campus 00 - shoeId 5
  { id: 25, shoeId: 5, sizeId: 1, stock: 1 },
  { id: 26, shoeId: 5, sizeId: 2, stock: 6 },
  { id: 27, shoeId: 5, sizeId: 3, stock: 4 },
  { id: 28, shoeId: 5, sizeId: 4, stock: 3 },
  { id: 29, shoeId: 5, sizeId: 5, stock: 7 },
  { id: 30, shoeId: 5, sizeId: 6, stock: 2 },
];

/*const users = [
  {
    id: 1,
    name: 'User Test',
    email: 'test@test.com'
  }
];*/

const carts = [
  {
    id: 1,
    userId: 1,
    status: 'ACTIVE'
  }
];

const cartItems = [
  {
    id: 1,
    cartId: 1,
    shoeId: 2,
    sizeId: 3,
    quantity: 1
  }
];

// Interfaces
interface AddCartItemRequest {
  cartId: number;
  shoeId: number;
  sizeId: number;
  quantity?: number;
}

export const handlers = [
  http.get(`*/api/shoes`, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() ?? '';

    const results = shoes.filter((shoe) =>
      `${shoe.brand} ${shoe.model}`
        .toLowerCase()
        .includes(search)
    );

    return HttpResponse.json(results);
  }),

  http.get(`*/api/shoes/images`, async ({ request }) => {
    const url = new URL(request.url);
    const searchId = url.searchParams.get('id');

    const results = images.filter((image) =>
      image.id === Number(searchId)
    );

    await delay(500);

    return HttpResponse.json(results);
  }),

  http.get('*/api/shoes/sizes', async ({ request }) => {
    const url = new URL(request.url);
    const shoeId = Number(url.searchParams.get('id'));

    const availableSizes = shoeSizes.filter(
      (shoeSize) =>
        shoeSize.shoeId === shoeId &&
        shoeSize.stock > 0
    );

    const results = availableSizes.map((shoeSize) => {
      const size = sizes.find(
        (size) => size.id === shoeSize.sizeId
      );

      return {
        id: shoeSize.id,
        sizeId: shoeSize.sizeId,
        size: size?.value,
        stock: shoeSize.stock
      };
    });

    return HttpResponse.json(results);
  }),

  // Return cart from specific user id
  http.get('*/api/cart', ({ request }) => {
    const url = new URL(request.url);
    const userId = Number(url.searchParams.get('userId'));

    const cart = carts.find(
      (cart) =>
        cart.userId === userId &&
        cart.status === 'ACTIVE'
    );

    if (!cart) {
      return HttpResponse.json([]);
    }

    const items = cartItems.filter(
      (item) => item.cartId === cart.id
    );

    return HttpResponse.json({
      ...cart,
      items
    });
  }),

  http.post('*/api/cart/items', async ({ request }) => {
    const body = await request.json() as AddCartItemRequest;

    const newItem = {
      id: cartItems.length + 1,
      cartId: body.cartId,
      shoeId: body.shoeId,
      sizeId: body.sizeId,
      quantity: body.quantity ?? 1
    };

    cartItems.push(newItem);
    console.log('Cart actual:', cartItems);
    
    return HttpResponse.json(
      newItem,
      { status: 201 }
    );
  }),
];