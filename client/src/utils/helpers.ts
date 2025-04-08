function sleep(duration: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function parseJSON(response: Response) {
  return response.json();
}

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the item(s).";
    default:
      return "There was an error retrieving the item(s). Please try again.";
  }
}

function checkStatus(response: any) {
  if (response.ok) {
    console.log("log server http success");
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

export { sleep, parseJSON, checkStatus, translateStatusToErrorMessage };
