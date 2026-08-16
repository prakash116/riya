export type HeroSlide = {
  id: string;
  eyebrow: string;
  titleTop: string;
  titleScript: string;
  description: string;
  image: string;
  alt: string;
  focus: string;
  tint: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "every-version",
    eyebrow: "Riya Closet / India",
    titleTop: "Dress every",
    titleScript: "version of you.",
    description:
      "Modern silhouettes, timeless Indian craft, and a little everyday magic—curated for plans big and small.",
    image: "/images/look-two.png",
    alt: "Woman wearing a purple Riya Closet suit beside a lakeside pavilion",
    focus: "50% 34%",
    tint: "#5b2246",
  },
  {
    id: "craft",
    eyebrow: "The festive edit / 2026",
    titleTop: "Craft you can",
    titleScript: "feel all day.",
    description:
      "Hand-finished embroidery, breathable weaves, and drapes that move with you from morning chai to midnight plans.",
    image: "/images/look-one.png",
    alt: "Riya Closet campaign look photographed outside the boutique",
    focus: "50% 26%",
    tint: "#41142f",
  },
  {
    id: "colour",
    eyebrow: "New in store / Co-ords",
    titleTop: "Colour that",
    titleScript: "speaks first.",
    description:
      "Easy separates in electric blues and quiet neutrals—built for the days you want to be seen without trying.",
    image: "/images/editorial-one.png",
    alt: "Model in a blue wrap co-ord set inside the Riya Closet boutique",
    focus: "50% 22%",
    tint: "#1d3a63",
  },
];

export const collections = [
  {
    number: "01",
    title: "Suit Sets",
    note: "With dupatta",
    count: "48 styles",
    image: "/images/suits.jpg",
    className: "collection-card--wide",
  },
  {
    number: "02",
    title: "Co-ord Sets",
    note: "Made to move",
    count: "32 styles",
    image: "/images/coords.jpg",
    className: "collection-card--tall",
  },
  {
    number: "03",
    title: "Occasion Edit",
    note: "For the good nights",
    count: "26 styles",
    image: "/images/product-maya.jpg",
    className: "collection-card--small",
  },
];

export const products = [
  {
    name: "Lotus Anarkali Set",
    type: "Suit set with dupatta",
    price: "₹3,000",
    was: "₹3,800",
    tag: "New",
    image: "/images/product-lotus.jpg",
    color: "#d9ad7d",
  },
  {
    name: "Maya Elegance",
    type: "Embroidered suit set",
    price: "₹2,400",
    was: "₹2,950",
    tag: "Bestseller",
    image: "/images/product-maya.jpg",
    color: "#b3502d",
  },
  {
    name: "Dusty Rose",
    type: "Tissue silk co-ord",
    price: "₹2,200",
    was: null,
    tag: "New",
    image: "/images/product-dusty.jpg",
    color: "#bd8490",
  },
  {
    name: "Plum Bow Dress",
    type: "Easy day dress",
    price: "₹1,850",
    was: "₹2,300",
    tag: "Only 4 left",
    image: "/images/product-maroon.jpg",
    color: "#6a193c",
  },
  {
    name: "Teal Whisper",
    type: "Georgette suit set",
    price: "₹2,650",
    was: null,
    tag: "New",
    image: "/images/product-teal.jpg",
    color: "#2f6f6b",
  },
];

export const testimonials = [
  {
    quote:
      "The anarkali fit like it was stitched for me. I have worn it to three functions already and someone asks about it every single time.",
    name: "Ananya S.",
    location: "Jaipur",
    detail: "Lotus Anarkali Set",
  },
  {
    quote:
      "Finally a co-ord that survives a full work day and still looks put together at dinner. The fabric breathes beautifully.",
    name: "Meher K.",
    location: "Mumbai",
    detail: "Dusty Rose Co-ord",
  },
  {
    quote:
      "Ordered from London and it reached in nine days, beautifully packed. The embroidery detail is far richer in person.",
    name: "Priya R.",
    location: "London",
    detail: "Maya Elegance",
  },
  {
    quote:
      "I am usually between sizes and dread ordering online. The size exchange made it completely stress free.",
    name: "Nikita B.",
    location: "Bengaluru",
    detail: "Plum Bow Dress",
  },
];

export const stats = [
  { value: 12, suffix: "K+", label: "Happy customers" },
  { value: 340, suffix: "+", label: "Styles curated" },
  { value: 18, suffix: "", label: "Countries shipped" },
];

export const promises = [
  {
    number: "01",
    title: "Worldwide shipping",
    copy: "Curated in India, delivered to your corner of the world.",
  },
  {
    number: "02",
    title: "Secure payments",
    copy: "A smooth, trusted experience from browse to doorstep.",
  },
  {
    number: "03",
    title: "3 day size exchange",
    copy: "Three days to make sure the fit feels just right.",
  },
];

export const lookbook = [
  { image: "/images/look-one.png", alt: "Purple batik co-ord street look" },
  { image: "/images/editorial-one.png", alt: "Blue wrap top with white trousers" },
  { image: "/images/product-lotus.jpg", alt: "Lotus anarkali detail" },
  { image: "/images/editorial-two.png", alt: "Black wrap co-ord set" },
  { image: "/images/coords.jpg", alt: "Co-ord set styling" },
  { image: "/images/product-teal.jpg", alt: "Teal georgette suit set" },
  { image: "/images/suits.jpg", alt: "Suit set with dupatta" },
  { image: "/images/product-maya.jpg", alt: "Maya elegance embroidered set" },
];

export const announcements = [
  "Free worldwide shipping over ₹5,000",
  "New season, new silhouettes",
  "3 day size exchange, no questions",
];

export const navLinks = [
  { href: "#new-arrivals", label: "New in" },
  { href: "#collections", label: "Collections" },
  { href: "#story", label: "Our world" },
  { href: "#loved", label: "Loved by you" },
  { href: "#footer", label: "Visit us" },
];
