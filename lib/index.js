class vendingMachine {
  constructor(inventory) {
    this.products = inventory.products;
    this.coins = inventory.coins;
    this.cashAmount = 0; //rename for semantics
    this.coinsInserted = [];
    this.productId = this.products.map(product => product.id);
    this.coinsId = this.coins.map(coin => coin.id);
  }
  //print available inventory
  printInventory() {
    // console.log(this.inventory.products);
    return this.products;
  }
  //user selection
  selectItem(itemId) {
    if (this.productId.includes(itemId)) {
      return this.products[this.productId.indexOf(itemId)];
    } else {
      throw new Error("Please make a valid selection");
    }
  }
  addCoins(coinId) {
    this.coinsInserted.push(coinId);
    let dollarAmounts = this.coinsInserted.map(
      coinId => this.coins[this.coinsId.indexOf(coinId)].value
    );
    return dollarAmounts;
  }
  calculateCashAmountInput(dollarAmounts) {
    const addCoins = (accumulator, currentValue) => accumulator + currentValue;
    return (this.cashAmount = dollarAmounts.reduce(addCoins));
  }

  displayCashAmountInput(cashAmount) {
    if (!cashAmount || cashAmount === 0) {
      throw new Error("no coin input");
    }
    return `You've inserted $${(this.cashAmount += cashAmount)}`;
  }
  checkCashAmountInput(cashAmount, itemId) {
    if (cashAmount < this.products[this.productId.indexOf(itemId)].price) {
      return `You're short $${this.products[this.productId.indexOf(itemId)].price - cashAmount}`;
    } else {
      return `Your change will be $${cashAmount -
        this.products[this.productId.indexOf(itemId)].price}`;
    }
  }

  updateCoinsCurrentStock(coinId) {
    this.coinsInserted.push(coinId);
    console.log(this.coinsInserted);
    // this.coinsInserted.map(coin => {
    //   console.log(this.coins[this.coinsId.indexOf(coin)]);
    //   return (this.coins[this.coinsId.indexOf(coin)].currentStock += 1);
    // });
    for (let i = 0; i < this.coinsInserted.length; i++) {
      if (this.coinsInserted[i] === "toonie") {
        return (this.coins[this.coinsId.indexOf("toonie")].currentStock += 1);
      } else if (this.coinsInserted[i] === "loonie") {
        return (this.coins[this.coinsId.indexOf("loonie")].currentStock += 1);
      } else if (this.coinsInserted[i] === "quarter") {
        return (this.coins[this.coinsId.indexOf("quarter")].currentStock += 1);
      } else if (this.coinsInserted[i] === "dime") {
        return (this.coins[this.coinsId.indexOf("dime")].currentStock += 1);
      } else if (this.coinsInserted[i] === "nickel") {
        return (this.coins[this.coinsId.indexOf("nickel")].currentStock += 1);
      }
    }
  }
  dispenseItem(itemId, cashAmount) {
    if (itemId && cashAmount >= this.products[this.productId.indexOf(itemId)].price) {
      return {
        updatedStock: this.products[this.productId.indexOf(itemId)].currentStock - 1,
        itemDispensed: this.products[this.productId.indexOf(itemId)].name
      };
    }
  }
  dispenseChange(itemId, cashAmount) {
    if (cashAmount >= this.products[this.productId.indexOf(itemId)].price) {
      let changeAmount = cashAmount - this.products[this.productId.indexOf(itemId)].price;
      console.log(changeAmount);
      let changeArray = [];
      while (changeAmount > 0) {
        if (changeAmount >= 2 && this.coins[this.coinsId.indexOf("toonie")].currentStock > 0) {
          changeArray.push("toonie");
          this.coins[this.coinsId.indexOf("toonie")].currentStock -= 1;
          changeAmount -= 2;
        } else if (
          changeAmount >= 1 &&
          this.coins[this.coinsId.indexOf("loonie")].currentStock > 0
        ) {
          changeArray.push("loonie");
          this.coins[this.coinsId.indexOf("loonie")].currentStock -= 1;
          changeAmount -= 1;
        } else if (
          changeAmount >= 0.25 &&
          this.coins[this.coinsId.indexOf("quarter")].currentStock > 0
        ) {
          changeArray.push("quarter");
          this.coins[this.coinsId.indexOf("quarter")].currentStock -= 1;

          changeAmount -= 0.25;
        } else if (
          changeAmount >= 0.1 &&
          this.coins[this.coinsId.indexOf("dime")].currentStock > 0
        ) {
          changeArray.push("dime");
          this.coins[this.coinsId.indexOf("dime")].currentStock -= 1;
          changeAmount -= 0.1;
        } else if (
          changeAmount >= 0.05 &&
          this.coins[this.coinsId.indexOf("nickel")].currentStock > 0
        ) {
          changeArray.push("nickel");
          this.coins[this.coinsId.indexOf("nickel")].currentStock -= 1;
          changeAmount -= 0.05;
        }
      }
      return changeArray;
    }
  }
}

module.exports = vendingMachine;
