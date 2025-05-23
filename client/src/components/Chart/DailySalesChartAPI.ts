import { Sales } from "../../models/sales/sales";
import {
  parseJSON,
  checkStatus,
  translateStatusToErrorMessage,
} from "../../utils/helpers";

const baseUrl = "http://localhost:3300";
const url = `${baseUrl}/api/v1/sales`;

function convertToProjectModels(data: any[]): Sales[] {
  let sales: Sales[] = data.map(convertToProjectModel);
  return sales;
}

function convertToProjectModel(item: any): Sales {
  return new Sales(item);
}

const DailySalesChartAPI = {
  get() {
    return (
      fetch(`${url}`)
        //   .then(delay(600))
        .then(checkStatus)
        .then(parseJSON)
        .then(convertToProjectModels)
        .catch((error: TypeError) => {
          console.log("log client error " + error);
          throw translateStatusToErrorMessage(
            error instanceof Response ? error.status : 500
          );
        })
    );
  },
};

export { DailySalesChartAPI };
