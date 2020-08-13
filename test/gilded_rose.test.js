const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("gives all items a 'sellIn' and a 'quality' value", () => {
    const sellIn = 10;
    const quality = 20;

    const item = new Item("foo", sellIn, quality);

    expect(item.sellIn).toEqual(sellIn);
    expect(item.quality).toEqual(quality);
  });

  it("lowers the value of 'sellIn' by 1 each day for each item", () => {
    const item1 = new Item("item1", 10, 0);
    const item2 = new Item("item2", 5, 0);
    const gildedRose = new Shop([item1, item2]);

    gildedRose.updateQuality();

    expect(item1.sellIn).toEqual(9);
    expect(item2.sellIn).toEqual(4);
  });

  it("lowers the value of 'quality' by 1 each day for each item", () => {
    const sellIn = 20;

    const item1 = new Item("item1", sellIn, 10);
    const item2 = new Item("item2", sellIn, 5);
    const gildedRose = new Shop([item1, item2]);

    gildedRose.updateQuality();

    expect(item1.quality).toEqual(9);
    expect(item2.quality).toEqual(4);
  });

  it("lowers the quality of an item by 2 each day if the sell by date has passed", () => {
    const sellIn = 0;
    const quality = 4;

    const item = new Item("item", sellIn, quality);
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toEqual(2);
  });

  it("does not allow the quality of an item to become negative", () => {
    const sellIn = 0;
    const quality = 0;

    const item = new Item("item", sellIn, quality);
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toEqual(0);
  });
});
