import express from "express";
import adminController from "../controller/AdminController.js";
import {isAdminAuthenticated} from "../middleware/authAdmin.js";
const router = express.Router();

router.use(isAdminAuthenticated);

router.route('/pourcentages').post(adminController.getPourcentage);




export {router};