const getSuspender = (promise) => {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
};

export function fetchDataByFlightNumber(api, flightNumber) {
  const fullUrl = api + flightNumber;
  const promise = fetch(fullUrl)
    .then((response) => response.json())
    .then((json) => json);

  return getSuspender(promise);
}

export function fetchData(url) {
  const promise = fetch(`${url}/launches`)
    .then((response) => response.json())
    .then((json) => json);

  return getSuspender(promise);
}

export async function getLaunchByFlightNumber(api, flightNumber) {
  try {
    let url = api + flightNumber;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
