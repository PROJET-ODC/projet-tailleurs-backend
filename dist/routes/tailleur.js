import express from "express";
import tailleurController from "../controller/TailleurController.js";
import { isTailleurAuthenticated } from "../middleware/authTailleur.js";
const router = express.Router();
router.use(isTailleurAuthenticated);
router.route('/achetercredit').post(tailleurController.acheterCredit);
router.route('/articles/categories').get(tailleurController.getArticleCategories);
router.route('/articles').get(tailleurController.getAllArticles);
router.route('/articles/:slug').get(tailleurController.getSomeArticle);
router.route('/approvisions')
    .get(tailleurController.getAllApprovisions)
    .post(tailleurController.addApprovisions);
router.route('/approvisions/payereste').post(tailleurController.payerResteCommande);
router.route('/approvisions/details').get(tailleurController.detailsApprovisions);
export { router };
