import { validationResult } from "express-validator";
import log from "../../log.js";
import { login, ownershipUpdateDb, reatilerMapDb, register } from "../db/auth.js";

const regis = async(req, res) => {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
        return res.status(400).json({
            message: "Invalid Input",
            error: validationError.errors
        })
    }

    let { name, walletAddress, ownership } = req.body;

    try {
        if (ownership == null) {
            ownership = 2;
        }

        const [c] = await register({ name, walletAddress, ownership });

        const resp = {
            userId: c.insertId,
            name,
            walletAddress,
            ownership
        }

        return res.status(200).json({ 
            message: 'Success',
            response: resp
         })
    } catch (err) {
        log.error({ error: err.message }, '[register][error]');

        let status = err.message.toLowerCase().includes('duplicate') ? 'Duplicate Wallet Address Found' : err.message;

        if (status === 'Duplicate Wallet Address Found') {
            return res.status(400).json({
                message: 'Invalid Input',
                error: status
            })
        }

        return res.status(500).json({
            error: status
        })
    }
}

const logi = async(req, res) => {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
        return res.status(400).json({
            message: "Invalid Input",
            error: validationError.errors
        })
    }

    const { walletAddress } = req.body;

    try {
        const [[msg]] = await login({ walletAddress });

        return res.status(200).json({
            message: "Success",
            response: {
                name: msg.name,
                walletAddress: msg.walletAddress,
                userId: msg.userId,
                ownership: msg.ownership
            }
        })
    } catch (err) {
        log.error({ error: err.message }, '[register][error]');

        let status = err.message.toLowerCase().includes('cannot read properties of undefined') ? `Wallet Address doesn't exsists!` : err.message;

        if (status === `Wallet Address doesn't exsists!`) {
            return res.status(400).json({
                message: 'Invalid Input',
                error: status
            })
        }

        return res.status(500).json({
            error: err.message
        })
    }
}

const ownershipUpdate = async(req, res) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        return res.status(400).json({
            message: "Invalid Input",
            error: validationError.errors
        })
    }
    
    const { walletAddress, ownership } = req.body;
    
    try {
        const [msg] = await ownershipUpdateDb({ walletAddress, ownership });
        
        return res.status(200).json({
            message: 'Success',
            response: {
                walletAddress,
                ownership
            }
        })
    } catch (err) {
        log.error({ err }, '[ownershipUpdate][error]');
        let status = err.message.toLowerCase().includes('cannot read properties of undefined') ? `Wallet Address doesn't exsists!` : err.message;
        
        if (status === `Wallet Address doesn't exsists!`) {
            return res.status(400).json({
                message: 'Invalid Input',
                error: status
            })
        }
        
        return res.status(500).json({
            error: err.message
        })
    }
}

const retailerMapping = async(req, res) => {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
        return res.status(400).json({
            message: "Invalid Input",
            error: validationError.errors
        })
    }

    const { manufactererId, retailerAddress } = req.body;

    try {
        const [c] = await reatilerMapDb({ manufactererId, retailerAddress });

        return res.status(200).json({
            message: 'Success',
            response: {
                mapId: c.insertId,
                manufactererId,
                retailerAddress
            }
        })
    } catch (err) {
        log.error({ err }, '[retailerMapping][error]');
        
        let status = err.message.toLowerCase().includes('duplicate') ? 'Duplicate Wallet Address of retailer and manufactererId mapping' : err.message;

        if (status === 'Duplicate Wallet Address of retailer and manufactererId mapping') {
            return res.status(400).json({
                message: 'Invalid Input',
                error: status
            })
        }

        return res.status(500).json({
            error: status
        })
    }
}

export { regis, logi, ownershipUpdate, retailerMapping };