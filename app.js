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

// Mount auth routes (JWT)
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Mount API routes
const developerRoutes = require('./routes/developerRoutes');
const projectRoutes = require('./routes/projectRoutes');
const toolRoutes = require('./routes/toolRoutes');

app.use('/api/developers', developerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tools', toolRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler (after routes)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// listen at the end
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));