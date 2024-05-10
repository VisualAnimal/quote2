const express = require('express');
const cors = require('cors')
const brandRoutes = require('./routes/brandRoutes')
const productRoutes = require('./routes/productRoutes')
// const modelRoutes = require('./routes/modelRoutes')
// const capacityRoutes = require('./routes/capacityRoutes')
// const colorRoutes = require('./routes/colorRoutes');
const router = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

// app.use('/brands', brandRoutes)
// app.use('/models', modelRoutes)
// app.use('/capacities', capacityRoutes)
// app.use('/colors', colorRoutes)
// app.use('/products', productRoutes)

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
