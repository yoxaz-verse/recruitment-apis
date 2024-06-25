import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

interface Product {
  id: number;
  name: string;
  price: number;
}

// Generate dummy products
const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: parseFloat((Math.random() * 100).toFixed(2)),
  }));
};

const products: Product[] = generateProducts(100); // generate 100 products

// Get products with pagination
app.get('/products', (req: Request, res: Response) => {
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
