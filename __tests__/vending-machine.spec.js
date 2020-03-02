const VendingMachine = require("../lib/index");
const inventory = require("../mockData.json");

describe("vendingMachine", () => {
  let vendingMachine;
  beforeEach(() => {
    vendingMachine = new VendingMachine(inventory);
  });
  describe("print inventory", () => {
    it("should print initial inventory", () => {
      expect(vendingMachine.printInventory()).toBe(inventory.products);
    });
  });

  describe("when user selects an item", () => {
    it("should print the selected item's information", () => {
      expect(vendingMachine.selectItem("A1")).toBe(inventory.products[0]);
      expect(vendingMachine.selectItem("B3")).toBe(inventory.products[5]);
    });
  });
  describe("when user selection is an invalid product id or if there is no user selection", () => {
    it("should throw an error", () => {
      expect(() => {
        vendingMachine.selectItem("A45");
      }).toThrow();
      expect(() => {
        vendingMachine.selectItem(null);
      }).toThrow();
    });
  });
  describe("when user inserts a coin", () => {
    it("should push the coinId of the inserted coin into the coinsInserted array", () => {
      expect(vendingMachine.addCoins("toonie")).toEqual([2]);
      expect(vendingMachine.addCoins("dime")).toEqual([2, 0.1]);
    });
  });
  describe("when inserted coins have been pushed into the coinsInserted array", () => {
    it("should calculate the cash amount", () => {
      expect(vendingMachine.calculateCashAmountInput([2, 0.1])).toEqual(2.1);
      expect(vendingMachine.calculateCashAmountInput([4, 3, 11, 1.98])).toEqual(19.98);
    });
  });
  describe("when user inserts coins", () => {
    it("should return cash amount", () => {
      expect(vendingMachine.displayCashAmountInput(1 + 2 + 0.5)).toBe(`You've inserted $3.5`);
    });
  });
  describe("when there is no cash amount", () => {
    it("should throw an error", () => {
      expect(() => {
        vendingMachine.displayCashAmountInput(null);
      }).toThrow();
      expect(() => {
        vendingMachine.displayCashAmountInput(0);
      }).toThrow();
    });
  });

  describe("when cash amount is less than item price", () => {
    it("should return the additional amount to be paid", () => {
      expect(vendingMachine.checkCashAmountInput(1, "A1")).toBe("You're short $1");
      expect(vendingMachine.checkCashAmountInput(1.45, "A1")).toBe("You're short $0.55");
    });
  });
  describe("when cash amount is greater than item price", () => {
    it("should return change amount", () => {
      expect(vendingMachine.checkCashAmountInput(5, "B3")).toBe("Your change will be $2");
      expect(vendingMachine.checkCashAmountInput(4.55, "B2")).toBe("Your change will be $0");
    });
  });
  describe("When cash amount is equal to or greater than item price, and user has selected an item", () => {
    it("should subtract one from the item's current stock", () => {
      expect(vendingMachine.dispenseItem("A2", 3.75)).toEqual({
        updatedStock: inventory.products[1].currentStock - 1,
        itemDispensed: "coffee"
      });
    });
  });
  describe("when cash amount is equal to or greater than item price and an item has been dispensed", () => {
    it("should return the change amount as an array of coinIds", () => {
      expect(vendingMachine.dispenseChange("B1", 6.5)).toEqual([
        "toonie",
        "loonie",
        "quarter",
        "quarter"
      ]);
    });
  });
  describe("when cash amount is equal to or greater than item price and an item has been dispensed", () => {
    it("should update the coins currentStock based on cash amount received after change has been dispensed", () => {
      expect(vendingMachine.updateCoinsCurrentStock("dime")).toEqual(21);
    });
  });
});
