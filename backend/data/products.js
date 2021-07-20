// I will use this sample data to feed mongo atlas
// IMPORTANT!!!
// I got rid of the <_id:> fields because
// mongo adds those ids automatically

const products = [
  {
    name: "Leonard Sims ",
    image: "/images/1.jpg",
    description:
      "BLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    brand: "Mexico",
    category: "Psychoanalytic",
    price: 89.99,
    countInStock: 0,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Mildred Robertson",
    image: "/images/2.jpg",
    description:
      "ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec",
    brand: "Argentina",
    category: "Humanistic and Integrative",
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: "Myra Carson",
    image: "/images/3.jpg",
    description:
      "sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris a diam maecenas sed enim ut sem",
    brand: "Brazil",
    category: "Couple and Family",
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: "Emily Nava",
    image: "/images/4.jpg",
    description:
      "sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris a diam maecenas sed enim ut sem",
    brand: "Chile",
    category: "Cognitive Behavioural",
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Jonathan Guerra",
    image: "/images/5.jpg",
    description:
      "accumsan tortor posuere ac ut consequat semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi",
    brand: "Poland",
    category: "Psychoanalytic",
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: "Maddison Valencia",
    image: "/images/6.jpg",
    description:
      "in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in",
    brand: "Spain",
    category: "Constructivist",
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
];

export default products;
