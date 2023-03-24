import { validationResult } from "express-validator";
import log from "../../log.js";
import bcrypt from 'bcryptjs';
import { addRequestByRetailer, getAllLiveRequests, getAllAcceptedRequests, getAllRejectedRequests, acceptOrReject, fetch_product_id, fetch_manufacturer_id, check_retailer_of_manufacturer } from "../db/requests.js";


const makeRequest = async (req, res) => {


    const { retailer_address, cust_address, qr_id } = req.body;

    try {


        // check retailer
        const [product_id] = await fetch_product_id({ qr_id });
        console.log("product_id: ", product_id);

        const [manufacturer_id] = await fetch_manufacturer_id(product_id[0]);
        console.log("manufacturer_id: ", manufacturer_id[0].manufacturer_id);
        if (manufacturer_id == null || manufacturer_id == "" || manufacturer_id == [] || manufacturer_id == {}) {
            return res.status(404).json({
                message: "Retailer address can not add request for this qr_id/product"
            });
        }

        const m_id =  manufacturer_id[0].manufacturer_id;
        const [checkRetailer] = await check_retailer_of_manufacturer({ m_id , retailer_address}); // retailer_map
        console.log("checkRetailer: ", checkRetailer);
        if(checkRetailer == null || checkRetailer == "" || checkRetailer == [] || checkRetailer == {} || checkRetailer == undefined ){
            return res.status(404).json({
                message: "Retailer address can not add request for this qr_id/product"
            });
        }

        // add request
        const [c] = await addRequestByRetailer({ retailer_address, cust_address, qr_id });
        console.log(c)
        return res.status(200).json({ 
            message: c
         })



        return res.json({});

    }
    catch (err) {
        log.error({ error: err.message }, '[requests][error]');

        return res.status(500).json({
            error: err.message
        })
    }

}

const getAllRequests = async (req, res) => {

    const { cust_address } = req.body;

    try {

        const [live] = await getAllLiveRequests({ cust_address });
        const [accepted] = await getAllAcceptedRequests({ cust_address });
        const [rejected] = await getAllRejectedRequests({ cust_address });
        // const [transfered] =     


        const c = {
            live: live,
            accepted: accepted,
            rejected: rejected
            // transfered: 
        }

        return res.status(200).json({
            message: c
        })

    }
    catch (err) {
        log.error({ error: err.message }, '[requests][error]');

        return res.status(500).json({
            error: err.message
        })
    }

}

const actionByCustomer = async (req, res) => {

    const { request_id, status } = req.body;

    try {

        if (status == 0) {
            return res.status(200).json({
                message: "no updation with status 0 will be there"
            })
        }

        const [c] = await acceptOrReject({ request_id, status });

        return res.status(200).json({
            message: c
        })
    }
    catch (err) {
        log.error({ error: err.message }, '[requests][error]');

        return res.status(500).json({
            error: err.message
        })
    }

}



export { makeRequest, getAllRequests, actionByCustomer };
