const PRICES = [1.99, 0.99, 9.99, 12.49, 24000.99];
const CATEGORIES = ['Jackets', 'Sweaters', 'Pants', 'Caps', 'Socks'];
const COLORS = ['Blue', 'White', 'Yellow', 'Black'];
const SIZES = ['XS', 'Small', 'M', 'Large', 'XL'];
const IMAGE_COLORS = ['FFFFFF', 'FF0000', '00FF00', '0000FF'];

function range(start, end) {
  return Array.apply(0, Array(end))
    .map((element, index) => index + start);
}

function random(top, bottom = 0) {
  return Math.floor(Math.random() * (top - bottom)) + bottom;
}

function randomImageSize(type = 'regular') {
  const sizes = {
    regular: [1441, 478],
    thumb: [481, 241]
  };
  return `${random(...sizes[type])}x${random(...sizes[type])}`;
}

function randomImageColor() {
  return IMAGE_COLORS[random(IMAGE_COLORS.length)];
}

function generateImageURL(title, type = 'regular') {
  return `https://via.placeholder.com/${randomImageSize(type)}/${randomImageColor()}?text=${encodeURIComponent(title)}`;
}

const products = range(0, 100).map((c, i) => {
  const title = `Product #${i}`;
  const price = PRICES[random(PRICES.length)];
  const salePrice = Math.random() > 0.8 ? price * 0.75 : price;

  return {
    id: i,
    title,
    price: `$${price}`,
    sale_price: `$${salePrice}`,
    in_stock: Math.random() > 0.1 ? 'Yes' : 'No',
    thumbnail: generateImageURL(title, 'thumb'),
    images: [
      { url: generateImageURL('Image 1', 'regular') },
      { url: generateImageURL('Image 2', 'regular') },
      { url: generateImageURL('Image 3', 'regular') },
    ],
    categories: range(1, 3).map(() => (CATEGORIES[random(CATEGORIES.length)])),
    color: COLORS[random(COLORS.length)],
    sizes: range(1, 3).map(() => (SIZES[random(SIZES.length)]))
  };
});

console.dir(products, { depth: null });
