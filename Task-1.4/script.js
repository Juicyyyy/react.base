var Product = /** @class */ (function () {
    function Product(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    return Product;
}());
var Order = /** @class */ (function () {
    function Order(id, products, total) {
        this.id = id;
        this.products = products;
        this.total = total;
        this.status = 'Pending';
    }
    Order.prototype.updateStatus = function (newStatus) {
        this.status = newStatus;
    };
    return Order;
}());
var Cart = /** @class */ (function () {
    function Cart() {
        this.products = [];
    }
    Cart.prototype.addProduct = function (product) {
        this.products.push(product);
    };
    Cart.prototype.removeProduct = function (productId) {
        this.products = this.products.filter(function (product) { return product.id !== productId; });
    };
    Cart.prototype.viewCart = function () {
        return this.products;
    };
    Cart.prototype.calculateTotal = function () {
        return this.products.reduce(function (total, product) { return total + product.price; }, 0);
    };
    return Cart;
}());
var ProductManager = /** @class */ (function () {
    function ProductManager() {
        this.products = [];
    }
    ProductManager.prototype.addProduct = function (product) {
        this.products.push(product);
    };
    ProductManager.prototype.removeProduct = function (productId) {
        this.products = this.products.filter(function (product) { return product.id !== productId; });
    };
    ProductManager.prototype.viewProducts = function () {
        return this.products;
    };
    return ProductManager;
}());
var OrderManager = /** @class */ (function () {
    function OrderManager() {
        this.orders = [];
        this.orderIdCounter = 1;
    }
    OrderManager.prototype.createOrder = function (cart) {
        var newOrder = new Order(this.orderIdCounter++, cart.viewCart(), cart.calculateTotal());
        this.orders.push(newOrder);
        return newOrder;
    };
    OrderManager.prototype.updateOrderStatus = function (orderId, newStatus) {
        var orders = this.orders.filter(function (order) { return order.id === orderId; });
        if (orders.length > 0) {
            orders[0].updateStatus(newStatus);
        }
    };
    OrderManager.prototype.viewOrders = function () {
        return this.orders;
    };
    return OrderManager;
}());
var productManager = new ProductManager();
var orderManager = new OrderManager();
var cart = new Cart();
// Добавляем товары
var product1 = new Product(1, 'Laptop', 1000);
var product2 = new Product(2, 'Phone', 500);
productManager.addProduct(product1);
productManager.addProduct(product2);
// Просмотр товаров
console.log('Available Products:', productManager.viewProducts());
// Добавляем товары в корзину
cart.addProduct(product1);
cart.addProduct(product2);
console.log('Current Cart:', cart.viewCart());
// Создаем заказ
var order = orderManager.createOrder(cart);
console.log('New Order Created:', order);
// Обновляем статус заказа
orderManager.updateOrderStatus(order.id, 'Shipped');
console.log('Updated Orders:', orderManager.viewOrders());
