class Product {
    constructor(public id: number, public name: string, public price: number) {}
}

class Order {
    public status: string;

    constructor(public id: number, public products: Product[], public total: number) {
        this.status = 'Pending';
    }

    public updateStatus(newStatus: string) {
        this.status = newStatus;
    }
}

class Cart {
    public products: Product[] = [];

    public addProduct(product: Product) {
        this.products.push(product);
    }

    public removeProduct(productId: number) {
        this.products = this.products.filter(product => product.id !== productId);
    }

    public viewCart() {
        return this.products;
    }

    public calculateTotal() {
        return this.products.reduce((total, product) => total + product.price, 0);
    }
}

class ProductManager {
    private products: Product[] = [];

    public addProduct(product: Product) {
        this.products.push(product);
    }

    public removeProduct(productId: number) {
        this.products = this.products.filter(product => product.id !== productId);
    }

    public viewProducts() {
        return this.products;
    }
}

class OrderManager {
    private orders: Order[] = [];
    private orderIdCounter: number = 1;

    public createOrder(cart: Cart) {
        const newOrder = new Order(this.orderIdCounter++, cart.viewCart(), cart.calculateTotal());
        this.orders.push(newOrder);
        return newOrder;
    }

    public updateOrderStatus(orderId: number, newStatus: string) {
        const orders = this.orders.filter(order => order.id === orderId);
        if (orders.length > 0) {
            orders[0].updateStatus(newStatus);
        }
    }

    public viewOrders() {
        return this.orders;
    }
}

const productManager = new ProductManager();
const orderManager = new OrderManager();
const cart = new Cart();

// Добавляем товары
const product1 = new Product(1, 'Laptop', 1000);
const product2 = new Product(2, 'Phone', 500);
productManager.addProduct(product1);
productManager.addProduct(product2);

// Просмотр товаров
console.log('Available Products:', productManager.viewProducts());

// Добавляем товары в корзину
cart.addProduct(product1);
cart.addProduct(product2);
console.log('Current Cart:', cart.viewCart());

// Создаем заказ
const order = orderManager.createOrder(cart);
console.log('New Order Created:', order);

// Обновляем статус заказа
orderManager.updateOrderStatus(order.id, 'Shipped');
console.log('Updated Orders:', orderManager.viewOrders());