// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/shoes', () => {
    return HttpResponse.json([
      { id: 1, brand: 'Adidas', model:'Samba', price: 145, img: 'https://siman.vtexassets.com/arquivos/ids/5885735-1600-auto?v=638792020024830000&width=1600&height=auto&aspect=true'},
      { id: 2, brand: 'Nike', model:'Air', price: 220, img: 'https://shoelab.cr/wp-content/uploads/2024/05/cw2288-111_1.jpg'},
    ]);
  }),
];