const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

dotenv.config();
connectDB();

const app = express();
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use(express.json());

// add CORS
const cors = require('cors');
app.use(cors());

// Routes
const developerRoutes = require('./routes/developerRoutes');
app.use('/api/developers', developerRoutes);

const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

const toolRoutes = require('./routes/toolRoutes');
app.use('/api/tools', toolRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler (after routes)
const errorHandler = require('./middleware/errorHandler'); // Ensure this is a function
app.use(errorHandler);

// listen at the end
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));