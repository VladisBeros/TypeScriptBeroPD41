type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description?: string;
    inStock?: boolean;
};

type Electronics = BaseProduct & {
    category: 'electronics';
    brand: string;
    warranty: string;
};

type Clothing = BaseProduct & {
    category: 'clothing';
    size: string;
    material: string;
};

type Book = BaseProduct & {
    category: 'book';
    author: string;
    genre: string;
};

/**
 * Пошук товару за id
 * @param products - масив товарів
 * @param id - id товару для пошуку
 * @returns знайдений товар або undefined
 */

const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    return products.find(product => product.id === id);
};

/**
 * Фільтрація товарів за максимальною ціною
 * @param products - масив товарів
 * @param maxPrice - максимальна ціна
 * @returns масив товарів з ціною, меншою або рівною maxPrice
 */

const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    return products.filter(product => product.price <= maxPrice);
};

type CartItem<T> = {
    product: T;
    quantity: number;
};

/**
 * Додавання товару в кошик
 * @param cart - поточний кошик
 * @param product - товар для додавання
 * @param quantity - кількість товару
 * @returns оновлений масив кошика
 */

const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T,
    quantity: number
): CartItem<T>[] => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    return cart;
};

/**
 * Підрахунок загальної вартості кошика
 * @param cart - масив елементів кошика
 * @returns загальна вартість
 */

const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

const electronics: Electronics[] = [
    {
        id: 1,
        name: "Телефон",
        price: 10000,
        category: 'electronics',
        brand: "BrandX",
        warranty: "2 роки"
    }
];

const clothing: Clothing[] = [
    {
        id: 2,
        name: "Футболка",
        price: 500,
        category: 'clothing',
        size: "M",
        material: "Бавовна"
    }
];

const books: Book[] = [
    {
        id: 3,
        name: "Велика книга",
        price: 300,
        category: 'book',
        author: "Автор",
        genre: "Фантастика"
    }
];



const phone = findProduct(electronics, 1);
if (phone) {
    const cart = addToCart([], phone, 1);
    console.log("Кошик після додавання телефону:", cart);
    const total = calculateTotal(cart);
    console.log("Загальна вартість кошика:", total);
}

const affordableClothing = filterByPrice(clothing, 600);
console.log("Доступний одяг до 600 грн:", affordableClothing);
