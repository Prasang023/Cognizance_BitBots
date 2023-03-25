import error from "./slices/error";
import success from "./slices/success";
import navbar from "./navbar";
import manufacturer from "./slices/manufacturer";
import customer from "./slices/customer";
import retailer from "./slices/retailer";

const rootReducer = {
  error,
  success,
  navbar,
  manufacturer,
  customer,
  retailer
};

export default rootReducer;
