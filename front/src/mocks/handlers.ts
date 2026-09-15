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
  { id: 1, shoeId: 1, sizeId: 1, stock: 5 },
  { id: 2, shoeId: 1, sizeId: 2, stock: 3 },
  { id: 3, shoeId: 1, sizeId: 3, stock: 8 },
  { id: 4, shoeId: 1, sizeId: 4, stock: 2 },
  { id: 5, shoeId: 1, sizeId: 5, stock: 6 },
  { id: 6, shoeId: 1, sizeId: 6, stock: 0 },

  { id: 7, shoeId: 2, sizeId: 1, stock: 2 },
  { id: 8, shoeId: 2, sizeId: 2, stock: 4 },
  { id: 9, shoeId: 2, sizeId: 3, stock: 1 },
  { id: 10, shoeId: 2, sizeId: 4, stock: 7 },
  { id: 11, shoeId: 2, sizeId: 5, stock: 3 },
  { id: 12, shoeId: 2, sizeId: 6, stock: 5 },
];

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
];