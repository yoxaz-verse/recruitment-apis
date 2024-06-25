import express from 'express';
import productRouter from './products';
import coffeeRouter from './coffees';
import path from 'path';

const app = express();
const port = 3000;
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/products', productRouter);
app.use('/coffees', coffeeRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
