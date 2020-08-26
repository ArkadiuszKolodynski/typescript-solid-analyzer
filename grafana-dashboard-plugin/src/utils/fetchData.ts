export const fetchData = async (url: string, options?: RequestInit): Promise<any> => {
  if (options) options.headers = { ...options.headers, 'Content-Type': 'application/json', 'X-API-KEY': 'asdf' };
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error((await response.json()).message);
    return response.json();
  } catch (err) {
    console.error(err);
  }
};
