import error from "./slices/error";
import success from "./slices/success";
import navbar from "./navbar";
import manufacturer from "./slices/manufacturer";
import customer from "./slices/customer";

const rootReducer = {
  error,
  success,
  navbar,
  manufacturer,
  customer,
};

export default rootReducer;
