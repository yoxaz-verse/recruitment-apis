import express, { Request, Response } from 'express';

const router = express.Router();

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

// Generate dummy products with randomized images
const generateProducts = (count: number): Product[] => {
  const placeholderImages = [
    "/images/notebook/notebook1.jpg",
    "/images/notebook/notebook2.jpg",
    "/images/notebook/notebook3.jpg"
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: parseFloat((Math.random() * 100).toFixed(2)),
    imageUrl: placeholderImages[Math.floor(Math.random() * placeholderImages.length)]
  }));
};

const products: Product[] = generateProducts(100); // generate 100 products

// Get products with pagination
router.get('/', (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedProducts = products.slice(start, end);
  const totalPages = Math.ceil(products.length / limit);

  res.json({
    page,
    limit,
    total: products.length,
    totalPages,
    products: paginatedProducts,
  });
});

export default router;
