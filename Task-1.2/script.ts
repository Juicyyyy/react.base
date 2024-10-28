interface Car {
    displayInfo(): void;
    getEngineStatus(): string;
    getTiresStatus(): string;
    refuel(amount: number): void;
}

interface Engine {
    start(): void;
    stop(): void;
    getStatus(): string;
}

interface Tires {
    checkPressure(): string;
}

interface Fuel {
    refuel(amount: number): void;
    getLevel(): number;
}

class MyEngine implements Engine {
    private isRunning: boolean = false;

    start(): void {
        this.isRunning = true;
        console.log('Двигатель запущен');
    }

    stop(): void {
        this.isRunning = false;
        console.log('Двигатель остановлен');
    }

    getStatus(): string {
        return this.isRunning ? 'Двигатель работает' : 'Двигатель не работает';
    }
}

class MyTires implements Tires {
    checkPressure(): string {
        return 'Давление в шинах в норме';
    }
}

class MyFuel implements Fuel {
    private level: number = 50;

    refuel(amount: number): void {
        this.level = Math.min(this.level + amount, 100);
        console.log(`Заправлено ${amount}%. Уровень топлива: ${this.level}%`);
    }

    getLevel(): number {
        return this.level;
    }
}

class MyCar implements Car {
    private engine: Engine;
    private tires: Tires;
    private fuel: Fuel;

    constructor() {
        this.engine = new MyEngine();
        this.tires = new MyTires();
        this.fuel = new MyFuel();
    }

    displayInfo(): void {
        console.log('Информация об автомобиле:');
        console.log(this.getEngineStatus());
        console.log(this.getTiresStatus());
        console.log(`Уровень топлива: ${this.fuel.getLevel()}`);
    }

    getEngineStatus(): string {
        return this.engine.getStatus();
    }

    getTiresStatus(): string {
        return this.tires.checkPressure();
    }

    refuel(amount: number): void {
        this.fuel.refuel(amount);
    }
}

const myCar = new MyCar();

myCar.displayInfo(); // Вывод информации об авто
myCar.refuel(30);    // Заправка автомобиля
myCar.displayInfo(); // Повторный вывод информации об авто
myCar.refuel(25);    // Заправка автомобиля
myCar.displayInfo(); // Повторный вывод информации об авто