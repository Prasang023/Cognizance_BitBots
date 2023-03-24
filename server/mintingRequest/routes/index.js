import express from 'express';
import { body } from 'express-validator';
import { getAllRequests, makeRequest, actionByCustomer } from "../controllers/requests.js";

const router = express.Router();

router.post('/addRequest', async (req, res) => { 
    // add a reuest by retailer
    makeRequest(req,res);
});

router.post('/getAllRequests', async (req, res) => { 
    // get all request for minting a warrenty
    getAllRequests(req,res);
});

router.post('/acceptOrRejectRequest', async (req, res) => { 
    // accept or reject a particular request of a user
    actionByCustomer(req,res);
});


export default router;