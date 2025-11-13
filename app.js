const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
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
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler (after routes)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// listen at the end
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));