import express from 'express';
import { body } from 'express-validator';
import { isProductRetailer, productDetails, productManufacture, QRgenerator, updateProductStatus } from '../controllers/product.js';

const router = express.Router();

router.post('/registerProduct', body('warrantyTime').exists(), body('manufactererId').exists(), body('name').exists(), async(req, res) => {
    productDetails(req, res);
})

router.get('/productRetailer', body('retailerAddress').exists(), body('qrId').exists(), async(req, res) => {
    isProductRetailer(req, res);
})

router.post('/productManufacture', async(req, res) => {
    productManufacture(req, res);
})

router.put('/updateProductStatus', async(req, res) => {
    updateProductStatus(req, res);
})

router.post('/qrGenerator', async(req, res) => {
    QRgenerator(req, res);
})

export default router;