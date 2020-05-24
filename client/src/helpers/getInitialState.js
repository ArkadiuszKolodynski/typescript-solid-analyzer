import { fetchData } from "./fetchData";

export const getInitialState = async () => {
  try {
    const user = await fetchData("/api/v1/auth/status");
    return { authenticated: true, user };
  } catch (err) {
    return { authenticated: false, user: null };
  }
};
