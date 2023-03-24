import { pool } from "../../connections/db.js";

const addRequestByRetailer = (payload) => {
    const query = `INSERT INTO requests (requests.qr_id ,requests.retailer_address, requests.cust_address, requests.status, requests.created_at ) VALUES ( ?, ?, ?, ?, CURRENT_TIMESTAMP ) `;

    const msg = pool.query(query, [payload.qr_id ,payload.retailer_address, payload.cust_address, 0]);
    return msg;
}

const getAllLiveRequests = (payload) => {

    const query =  `SELECT r.qr_id, r.request_id, r.retailer_address, r.created_at   
    FROM requests as r
    WHERE r.cust_address = ? and status = 0`;

    const msg = pool.query(query, [payload.cust_address]);

    return msg;

}

const getAllAcceptedRequests = (payload) => {

    const query =  `SELECT r.qr_id, r.request_id, r.retailer_address, r.created_at   
    FROM requests as r
    WHERE r.cust_address = ? and status = 1`;

    const msg = pool.query(query, [payload.cust_address]);

    return msg;

}


const getAllRejectedRequests = (payload) => {

    const query =  `SELECT r.qr_id, r.request_id ,r.retailer_address, r.created_at   
    FROM requests as r
    WHERE r.cust_address = ? and status = 2`;

    const msg = pool.query(query, [payload.cust_address]);

    return msg;

}

const acceptOrReject = (payload) => {

    const query = `UPDATE requests as r
    SET r.status = ? 
    WHERE r.request_id = ?;`

    const msg = pool.query(query, [payload.status, payload.request_id]);

    return msg;    

}


const fetch_product_id = (payload) => {

    const query = `SELECT p.product_id 
    FROM products as p 
    WHERE p.qr_id = ?;`;
    const product_id = pool.query(query, [payload.qr_id]);

    return product_id;

}

const fetch_manufacturer_id = (payload) => {

    const query = `SELECT pd.manufacturer_id
    FROM product_details as pd
    WHERE pd.product_id = ?  `;
    const manufacturer_id = pool.query(query, [payload.product_id]);
    return manufacturer_id;

}

const check_retailer_of_manufacturer = (payload) => {

    const query = `SELECT rm.map_id 
    FROM retailer_map as rm
    WHERE rm.manufacterer_id = ? and rm.retailer_address = ?`;
    const msg = pool.query(query, [payload.m_id, payload.retailer_address]);
    return msg;


}

export { addRequestByRetailer, getAllLiveRequests, getAllAcceptedRequests, getAllRejectedRequests, acceptOrReject, fetch_product_id, fetch_manufacturer_id, check_retailer_of_manufacturer };