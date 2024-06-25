import express, { Request, Response } from 'express';

const router = express.Router();

interface Coffee {
  id: number;
  name: string;
  type: string;
  price: number;
  imageUrl: string;
  rating: number;
}

// Generate dummy coffee list with images and dynamic ratings
const generateCoffees = (count: number): Coffee[] => {
  const placeholderImages = [
    "/images/coffee/coffee1.jpg",
    "/images/coffee/coffee2.jpg",
    "/images/coffee/coffee3.jpg"
  ];
  const coffeeTypes = ['Espresso', 'Latte', 'Cappuccino', 'Americano', 'Mocha'];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Coffee ${index + 1}`,
    type: coffeeTypes[Math.floor(Math.random() * coffeeTypes.length)],
    price: parseFloat((Math.random() * 10 + 5).toFixed(2)), // Random price between 5 and 15
    imageUrl: placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
    rating: parseFloat((Math.random() * 5).toFixed(1)) // Random rating between 0 and 5
  }));
};

const coffees: Coffee[] = generateCoffees(50); // generate 50 coffees

// Get coffees with pagination
router.get('/', (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedCoffees = coffees.slice(start, end);
  const totalPages = Math.ceil(coffees.length / limit);

  res.json({
    page,
    limit,
    total: coffees.length,
    totalPages,
    coffees: paginatedCoffees,
  });
});

export default router;
