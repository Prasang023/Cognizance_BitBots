import { validationResult } from "express-validator";
import log from "../../log.js";
import { productDetailsDb, productManuDb, productManuStatusUp, productMapingDb } from "../db/product.js";
import QRCode from 'qrcode';

const productDetails = async (req, res) => {
    let { manufactererId, name, details, image, warrantyTime } = req.body;

    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
        return res.status(400).json({
            message: 'Bad Request',
            error: validationError.errors
        })
    }

    try {

        if (image == null) {
            image = '';
        }
        if (details == null) {
            details = '';
        }

        const [msg] = await productDetailsDb({ manufactererId, name, details, image, warrantyTime });

        return res.status(200).json({
            message: 'Success',
            response: {
                productId: msg.insertId,
                manufactererId,
                name,
                details,
                image,
                warrantyTime
            }
        })
    } catch (err) {
        log.error({ err }, '[productDetails][error]')

        return res.status(500).json({
            message: 'INTERNAL SERVER ERROR',
            error: err.message
        })
    }
}

const isProductRetailer = async (req, res) => {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
        return res.status(400).json({
            message: 'Bad Request',
            error: validationError
        })
    }

    let { qrId, retailerAddress } = req.body;

    try {
        const [[c]] = await productMapingDb({ retailerAddress, qrId });

        let status = '';

        if (c.count === 0) {
            status = false;
        } else {
            status = true;
        }

        return res.status(200).json({
            message: 'Success',
            status
        })
    } catch (err) {
        log.error({ err }, '[productDetails][error]')

        return res.status(500).json({
            message: 'INTERNAL SERVER ERROR',
            error: err.message
        })
    }
}

const productManufacture = async (req, res) => {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
        return res.status(400).json({
            message: 'Bad Request',
            error: validationError
        })
    }

    let { productId, qrId, status, ipfs } = req.body;

    try {
        const [c] = await productManuDb({ productId, qrId, status, ipfs });

        let stringdata = JSON.stringify(qrId);

        //getting qr code from the qrdata by calling function
        QRCode.toDataURL(stringdata, function (error, code) {
            if (error) {
                console.log("error occurred")
                return res.status(500).json({
                    message: 'INTERNAL SERVER ERROR',
                    error: error.message
                })
            }

            // Printing the code
            console.log(code)
            return res.status(200).json({
                message: 'success',
                insertionId: c.insertId,
                image: code
            })
        })

    } catch (err) {
        log.error({ err }, '[productDetails][error]')

        return res.status(500).json({
            message: 'INTERNAL SERVER ERROR',
            error: err.message
        })
    }
}

const updateProductStatus = async (req, res) => {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
        return res.status(400).json({
            message: 'Bad Request',
            error: validationError
        })
    }

    const { ipfs, status, qrId } = req.body;

    try {
        const [c] = await productManuStatusUp({ ipfs, status, qrId });

        return res.status(200).json({
            message: 'Success',
            reponse: {
                ipfs, status, qrId
            }
        })
    } catch (err) {
        log.error({ err }, '[productDetails][error]');

        let status = err.message.toLowerCase().includes('cannot read properties of undefined') ? `QR id doesn't exsists!` : err.message;

        if (status === `QR id doesn't exsists!`) {
            return res.status(400).json({
                message: 'Invalid Input',
                error: status
            })
        }

        return res.status(500).json({
            message: 'INTERNAL SERVER ERROR',
            error: err.message
        })
    }
}

const QRgenerator = async (req, res) => {
    const { qrId } = req.body;

    try {
        let qrStr = `https://cognizance-bit-bots-32opkfi9b-prasang023.vercel.app/product/${qrId}`;
        let stringdata = JSON.stringify(qrStr);

        //getting qr code from the qrdata by calling function
        QRCode.toDataURL(stringdata, function (error, code) {
            if (error) {
                console.log("error occurred")
                return res.status(500).json({
                    message: 'INTERNAL SERVER ERROR',
                    error: error.message
                })
            }

            // Printing the code
            return res.status(200).json({
                message: 'success',
                image: code
            })
        })
    } catch (err) {
        return res.status(500).json({
            message: 'INTERNAL SERVER ERROR',
            error: err.message
        })
    }
}

export { productDetails, isProductRetailer, productManufacture, updateProductStatus, QRgenerator };