export const backendUrl = "http://localhost:5000/api";
export const get = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) return data;
    else return new Error(data.error);
  } catch (error) {
    return error;
  }
};

export const post = async (url: string, body: any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.ok) return data;
    else return new Error(data.error);
  } catch (error) {
    return error;
  }
};

export const remove = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) return data;
    else return new Error(data.error);
  } catch (error) {
    return error;
  }
};

const http = {
  get,
  post,
  remove,
};

export default http;
