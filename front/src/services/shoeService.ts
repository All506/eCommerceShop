export const getShoeImages = async (shoeId: number) => {
    const response = await fetch(
        `${import.meta.env.BASE_URL}api/shoes/images?id=${shoeId}`
    );

    if (!response.ok) {
        throw new Error('Error obteniendo imágenes');
    }

    return response.json();
};

export const getShoeSizes = async (shoeId: number) => {
    const response = await fetch(
        `${import.meta.env.BASE_URL}api/shoes/sizes?id=${shoeId}`
    );

    if (!response.ok) {
        throw new Error('Error obteniendo tallas');
    }

    return response.json();
};

export const getAllShoes = async () => {
    const response = await fetch(`${import.meta.env.BASE_URL}api/shoes`);

    if (!response.ok) {
        throw new Error('Error obteniendo inventario');
    }
    return response.json();
}

export const getShoeByName = async (search:string) => {
    const response = await fetch(`${import.meta.env.BASE_URL}api/shoes?search=${encodeURIComponent(search)}`);

    if (!response.ok) {
        throw new Error('Error buscando en inventario');
    }
    return response.json();
}