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
    const item1 = createItem({ sellIn: 10 });
    const item2 = createItem({ sellIn: 5 });
    const gildedRose = new Shop([item1, item2]);

    gildedRose.updateQuality();

    expect(item1.sellIn).toEqual(9);
    expect(item2.sellIn).toEqual(4);
  });

  it("lowers the value of 'quality' by 1 each day for each item", () => {
    const item1 = createItem({ quality: 10 });
    const item2 = createItem({ quality: 5 });
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

  it("does not change the quality or sellIn of Sulfuras", () => {
    const item = createItem({
      name: "Sulfuras, Hand of Ragnaros",
      sellIn: 5,
      quality: 10,
    });
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.sellIn).toEqual(5);
    expect(item.quality).toEqual(10);
  });

  it("increases the quality by 1 each day for Backstage Passes when the sellIn is greater than 10", () => {
    const item = createItem({
      name: "Backstage passes to a TAFKAL80ETC concert",
      quality: 10,
      sellIn: 11,
    });
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toEqual(11);
  });

  it("increases the quality by 2 each day for Backstage Passes when the sellIn is between 6 and 10 days", () => {
    const item1 = createItem({
      name: "Backstage passes to a TAFKAL80ETC concert",
      quality: 10,
      sellIn: 6,
    });
    const item2 = createItem({
      name: "Backstage passes to a TAFKAL80ETC concert",
      quality: 10,
      sellIn: 10,
    });
    const gildedRose = new Shop([item1, item2]);

    gildedRose.updateQuality();

    expect(item1.quality).toEqual(12);
    expect(item2.quality).toEqual(12);
  });

  it("increases the quality by 3 each day for Backstage Passes when the sellIn is between 1 and 5 days", () => {
    const item1 = createItem({
      name: "Backstage passes to a TAFKAL80ETC concert",
      quality: 10,
      sellIn: 5,
    });
    const item2 = createItem({
      name: "Backstage passes to a TAFKAL80ETC concert",
      quality: 10,
      sellIn: 1,
    });
    const gildedRose = new Shop([item1, item2]);

    gildedRose.updateQuality();

    expect(item1.quality).toEqual(13);
    expect(item2.quality).toEqual(13);
  });

  it("drops the quality of Backstage Passes when the sellIn is 0", () => {
    const item1 = createItem({
      name: "Backstage passes to a TAFKAL80ETC concert",
      quality: 10,
      sellIn: 0,
    });
    const gildedRose = new Shop([item1]);

    gildedRose.updateQuality();

    expect(item1.quality).toEqual(0);
  });

  xit("decreases the quality of Conjured items by 2 each day", () => {
    const item = createItem({ name: "Conjured", quality: 4 });
    const gildedRose = new Shop([item]);

    gildedRose.updateQuality();

    expect(item.quality).toEqual(2);
  });
});

function createItem({ name = "item", sellIn = 10, quality = 20 }) {
  return new Item(name, sellIn, quality);
}
