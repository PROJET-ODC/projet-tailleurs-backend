import express from "express";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
import { router as authRoutes } from "./routes/auth.js";
import { router as clientRoutes } from "./routes/client.js";
import { router as tailleurRoutes } from "./routes/tailleur.js";
import { router as vendeurRoutes } from "./routes/vendeur.js";
import { router as AdminRoutes } from "./routes/admin.js";
import swaggerUi from "swagger-ui-express";
import yamljs from "yamljs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const allowedOrigins = ["http://localhost:5173"];

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Content-Type",
    "Origin",
    "Cache-Control",
    "X-File-Name",
  ], // Allow necessary headers
  credentials: true,
};

// Recréer __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_API = process.env.PREFIX_URI;
// Load your YAML file
const swaggerDocument = yamljs.load(path.join(__dirname, "..", "swagger.yaml"));

const PORT = process.env.PORT || 5000; // Ajoutez une valeur par défaut si le PORT n'est pas défini dans le fichier .env

// Middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
// Serve Swagger UI
app.use(
  "/api-docs-tailleur",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

const server = http.createServer(app);

// Initialize a new instance of Socket.IO by passing the HTTP server
export const  io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin and my frontend port = 5173
    methods: ["GET", "POST"], // Allow these HTTP methods
  },
});



app.use(`${BASE_API}`, authRoutes);
app.use(`${BASE_API}/client`, clientRoutes);
app.use(`${BASE_API}/tailleur`, tailleurRoutes);
app.use(`${BASE_API}/vendeur`, vendeurRoutes);
app.use(`${BASE_API}/admin`, AdminRoutes);


server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

