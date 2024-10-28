var MyEngine = /** @class */ (function () {
    function MyEngine() {
        this.isRunning = false;
    }
    MyEngine.prototype.start = function () {
        this.isRunning = true;
        console.log('Двигатель запущен');
    };
    MyEngine.prototype.stop = function () {
        this.isRunning = false;
        console.log('Двигатель остановлен');
    };
    MyEngine.prototype.getStatus = function () {
        return this.isRunning ? 'Двигатель работает' : 'Двигатель не работает';
    };
    return MyEngine;
}());
var MyTires = /** @class */ (function () {
    function MyTires() {
    }
    MyTires.prototype.checkPressure = function () {
        return 'Давление в шинах в норме';
    };
    return MyTires;
}());
var MyFuel = /** @class */ (function () {
    function MyFuel() {
        this.level = 50;
    }
    MyFuel.prototype.refuel = function (amount) {
        this.level = Math.min(this.level + amount, 100);
        console.log("\u0417\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E ".concat(amount, "%. \u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0442\u043E\u043F\u043B\u0438\u0432\u0430: ").concat(this.level, "%"));
    };
    MyFuel.prototype.getLevel = function () {
        return this.level;
    };
    return MyFuel;
}());
var MyCar = /** @class */ (function () {
    function MyCar() {
        this.engine = new MyEngine();
        this.tires = new MyTires();
        this.fuel = new MyFuel();
    }
    MyCar.prototype.displayInfo = function () {
        console.log('Информация об автомобиле:');
        console.log(this.getEngineStatus());
        console.log(this.getTiresStatus());
        console.log("\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0442\u043E\u043F\u043B\u0438\u0432\u0430: ".concat(this.fuel.getLevel()));
    };
    MyCar.prototype.getEngineStatus = function () {
        return this.engine.getStatus();
    };
    MyCar.prototype.getTiresStatus = function () {
        return this.tires.checkPressure();
    };
    MyCar.prototype.refuel = function (amount) {
        this.fuel.refuel(amount);
    };
    return MyCar;
}());
var myCar = new MyCar();
myCar.displayInfo(); // Вывод информации об авто
myCar.refuel(30); // Заправка автомобиля
myCar.displayInfo(); // Повторный вывод информации об авто
myCar.refuel(25); // Заправка автомобиля
myCar.displayInfo(); // Повторный вывод информации об авто
