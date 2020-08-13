const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("gives all items a 'sellIn' and a 'quantity' value", () => {
    const sellIn = 10;
    const quality = 20;

    const item = createItem({ sellIn, quality });

    expect(item.sellIn).toEqual(sellIn);
    expect(item.quality).toEqual(quality);
  });

  it("lowers the value of 'sellIn' by 1 each day for each item", () => {
    const item1 = createItem({ name: "item1", sellIn: 10 });
    const item2 = createItem({ name: "item2", sellIn: 5 });
    const gildedRose = new Shop([item1, item2]);

    gildedRose.updateQuality();

    expect(item1.sellIn).toEqual(9);
    expect(item2.sellIn).toEqual(4);
  });

  it("lowers the value of 'quality' by 1 each day for each item", () => {
    const item1 = createItem({ name: "item1", quality: 10 });
    const item2 = createItem({ name: "item2", quality: 5 });
    const gildedRose = new Shop([item1, item2]);

    gildedRose.updateQuality();

    expect(item1.quality).toEqual(9);
    expect(item2.quality).toEqual(4);
  });

  it("lowers the quality of an item by 2 each day if the sell by date has passed", () => {
    const item = createItem({ sellIn: 0, quality: 4 });
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toEqual(2);
  });

  it("does not allow the quality of an item to become negative", () => {
    const item = createItem({ quality: 0 });
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toEqual(0);
  });

  it("increases the quality by 1 each day for Aged Brie", () => {
    const item = createItem({ name: "Aged Brie", quality: 10 });
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toEqual(11);
  });

  it("does not increase the quality of Aged Brie past 50", () => {
    const item = createItem({ name: "Aged Brie", quality: 50 });
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toEqual(50);
  });


});

function createItem({ name = "item", sellIn = 10, quality = 20 }) {
  return new Item(name, sellIn, quality);
}
