import express from 'express';
import { body } from 'express-validator';
import { logi, ownershipUpdate, regis, retailerMapping } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', body('name').exists(), body('walletAddress').exists(), async (req, res) => { regis(req, res) });

router.post('/login', body('walletAddress').exists() ,async (req, res) => { logi(req, res) });

router.put('/ownershipUpdate', body('walletAddress').exists(), body('ownership').exists(), async(req, res) => ownershipUpdate(req, res));

router.post('/retailerMapping', body('manufactererId').exists(), body('retailerAddress').exists(), async(req, res) => retailerMapping(req, res));

export default router;