interface Account {
    balance: number;
    deposit(amount: number): void;
    withdraw(amount: number): void;
    getBalance(): number;
}
  
class DebitAccount implements Account {
    balance: number;
  
    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }
  
    deposit(amount: number): void {
        this.balance += amount;
        console.log(`Пополнен дебетовый счет на ${amount}. Текущий баланс: ${this.getBalance()}`);
    }
  
    withdraw(amount: number): void {
        if (amount > this.balance) {
            console.log(`Недостаточно средств для снятия ${amount}. Текущий баланс: ${this.getBalance()}`);
        } else {
            this.balance -= amount;
            console.log(`Снято с дебетового счета ${amount}. Текущий баланс: ${this.getBalance()}`);
        }
    }
  
    getBalance(): number {
        return this.balance;
    }
}
  
class CreditAccount implements Account {
    balance: number;
    limit: number;
  
    constructor(initialBalance: number, creditLimit: number) {
        this.balance = initialBalance;
        this.limit = creditLimit;
    }
  
    deposit(amount: number): void {
        this.balance += amount;
        console.log(`Пополнен кредитный счет на ${amount}. Текущий баланс: ${this.getBalance()}`);
    }
  
    withdraw(amount: number): void {
        if (this.balance + this.limit < amount) {
            console.log(`Превышен кредитный лимит. Невозможно снять ${amount}. Текущий баланс: ${this.getBalance()}`);
        } else {
            this.balance -= amount;
            console.log(`Снято с кредитного счета ${amount}. Текущий баланс: ${this.getBalance()}`);
        }
    }
  
    getBalance(): number {
        return this.balance;
    }
  
    getDebt(): number {
        return this.limit + this.balance < 0 ? Math.abs(this.balance) : 0;
    }
}

const debitAccount = new DebitAccount(1000);
debitAccount.deposit(500);
debitAccount.withdraw(300);
debitAccount.withdraw(1500);
  
const creditAccount = new CreditAccount(200, 500);
creditAccount.deposit(100);
creditAccount.withdraw(250);
creditAccount.withdraw(600);
  
console.log(`Текущий долг по кредитному счету: ${creditAccount.getDebt()}`);