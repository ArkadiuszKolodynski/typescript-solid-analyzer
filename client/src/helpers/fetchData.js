export const fetchData = async (url, data = null) => {
  let response;
  if (data === null) {
    response = await fetch(url);
  } else {
    //TODO
    console.log(document.cookie);
    data._csrf = document.cookie.split("=").pop();
    console.log(data);
    response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  if (!response.ok) throw new Error("Fetching data failed!");
  return response.json();
};
