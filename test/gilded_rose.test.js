const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("gives all items a 'sellIn' and a 'quantity' value", () => {
    const sellIn = 10;
    const quantity = 20;

    const item = new Item("foo", sellIn, quantity);

    expect(item.sellIn).toEqual(sellIn);
    expect(item.quality).toEqual(quantity);
  });

  it("lowers the value of 'sellIn' by 1 each day for each item", () => {
    const item1 = new Item("item1", 10, 0);
    const item2 = new Item("item2", 5, 0);
    const gildedRose = new Shop([item1, item2]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toEqual(9);
    expect(items[1].sellIn).toEqual(4);
  });

  it("lowers the value of 'quality' by 1 each day for each item", () => {
    const sellIn = 20;

    const item1 = new Item("item1", sellIn, 10);
    const item2 = new Item("item2", sellIn, 5);
    const gildedRose = new Shop([item1, item2]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toEqual(9);
    expect(items[1].quality).toEqual(4);
  });
});
