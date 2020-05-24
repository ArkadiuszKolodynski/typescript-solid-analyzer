export const fetchData = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Fetching data failed!");
};
