import { Customer } from "../../models/customer/customer";
import {
  parseJSON,
  checkStatus,
  translateStatusToErrorMessage,
} from "../../utils/helpers";

const baseUrl = "http://localhost:3300";
const url = `${baseUrl}/api/v1/customers`;

function convertToCustomertModels(data: any[]): Customer[] {
  let customer: Customer[] = data.map(convertToCustomertModel);
  return customer;
}

function convertToCustomertModel(item: any): Customer {
  return new Customer(item);
}

const CustomerTableAPI = {
  get() {
    return (
      fetch(`${url}`)
        //   .then(delay(600))
        .then(checkStatus)
        .then(parseJSON)
        .then(convertToCustomertModels)
        .catch((error: TypeError) => {
          console.log("log client error " + error);
          throw translateStatusToErrorMessage(
            error instanceof Response ? error.status : 500
          );
        })
    );
  },
};

export { CustomerTableAPI };
