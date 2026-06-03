// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('/api/shoes', () => {
        return HttpResponse.json([
            { id: 1, brand: 'Adidas', model: 'Samba', price: 145, img: 'https://siman.vtexassets.com/arquivos/ids/5885735-1600-auto?v=638792020024830000&width=1600&height=auto&aspect=true' },
            { id: 2, brand: 'Nike', model: 'Air', price: 220, img: 'https://shoelab.cr/wp-content/uploads/2024/05/cw2288-111_1.jpg' },
            { id: 3, brand: 'Nike', model: 'CourtVision', price: 120, img: 'https://www.sportline.cr/media/catalog/product/d/h/dh2987-109_phsrh000-1000.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:&format=jpeg' },
            { id: 4, brand: 'Converse', model: 'AllStar', price: 140, img: 'https://shoelab.cr/wp-content/uploads/2025/10/m7650c_1.jpg' },
            { id: 5, brand: 'Adidas', model: 'Campus 00', price: 160, img: 'https://shoelab.cr/wp-content/uploads/2024/10/hq8707_1.jpg' },
        ]);
    }),
];