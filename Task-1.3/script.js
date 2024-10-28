var DebitAccount = /** @class */ (function () {
    function DebitAccount(initialBalance) {
        this.balance = initialBalance;
    }
    DebitAccount.prototype.deposit = function (amount) {
        this.balance += amount;
        console.log("\u041F\u043E\u043F\u043E\u043B\u043D\u0435\u043D \u0434\u0435\u0431\u0435\u0442\u043E\u0432\u044B\u0439 \u0441\u0447\u0435\u0442 \u043D\u0430 ".concat(amount, ". \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0431\u0430\u043B\u0430\u043D\u0441: ").concat(this.getBalance()));
    };
    DebitAccount.prototype.withdraw = function (amount) {
        if (amount > this.balance) {
            console.log("\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u0434\u043B\u044F \u0441\u043D\u044F\u0442\u0438\u044F ".concat(amount, ". \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0431\u0430\u043B\u0430\u043D\u0441: ").concat(this.getBalance()));
        }
        else {
            this.balance -= amount;
            console.log("\u0421\u043D\u044F\u0442\u043E \u0441 \u0434\u0435\u0431\u0435\u0442\u043E\u0432\u043E\u0433\u043E \u0441\u0447\u0435\u0442\u0430 ".concat(amount, ". \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0431\u0430\u043B\u0430\u043D\u0441: ").concat(this.getBalance()));
        }
    };
    DebitAccount.prototype.getBalance = function () {
        return this.balance;
    };
    return DebitAccount;
}());
var CreditAccount = /** @class */ (function () {
    function CreditAccount(initialBalance, creditLimit) {
        this.balance = initialBalance;
        this.limit = creditLimit;
    }
    CreditAccount.prototype.deposit = function (amount) {
        this.balance += amount;
        console.log("\u041F\u043E\u043F\u043E\u043B\u043D\u0435\u043D \u043A\u0440\u0435\u0434\u0438\u0442\u043D\u044B\u0439 \u0441\u0447\u0435\u0442 \u043D\u0430 ".concat(amount, ". \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0431\u0430\u043B\u0430\u043D\u0441: ").concat(this.getBalance()));
    };
    CreditAccount.prototype.withdraw = function (amount) {
        if (this.balance + this.limit < amount) {
            console.log("\u041F\u0440\u0435\u0432\u044B\u0448\u0435\u043D \u043A\u0440\u0435\u0434\u0438\u0442\u043D\u044B\u0439 \u043B\u0438\u043C\u0438\u0442. \u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0441\u043D\u044F\u0442\u044C ".concat(amount, ". \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0431\u0430\u043B\u0430\u043D\u0441: ").concat(this.getBalance()));
        }
        else {
            this.balance -= amount;
            console.log("\u0421\u043D\u044F\u0442\u043E \u0441 \u043A\u0440\u0435\u0434\u0438\u0442\u043D\u043E\u0433\u043E \u0441\u0447\u0435\u0442\u0430 ".concat(amount, ". \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0431\u0430\u043B\u0430\u043D\u0441: ").concat(this.getBalance()));
        }
    };
    CreditAccount.prototype.getBalance = function () {
        return this.balance;
    };
    CreditAccount.prototype.getDebt = function () {
        return this.limit + this.balance < 0 ? Math.abs(this.balance) : 0;
    };
    return CreditAccount;
}());
var debitAccount = new DebitAccount(1000);
debitAccount.deposit(500);
debitAccount.withdraw(300);
debitAccount.withdraw(1500);
var creditAccount = new CreditAccount(200, 500);
creditAccount.deposit(100);
creditAccount.withdraw(250);
creditAccount.withdraw(600);
console.log("\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0434\u043E\u043B\u0433 \u043F\u043E \u043A\u0440\u0435\u0434\u0438\u0442\u043D\u043E\u043C\u0443 \u0441\u0447\u0435\u0442\u0443: ".concat(creditAccount.getDebt()));
