export const backendUrl = "http://localhost:5000/api";
const token_label = "X-Auth-Token";
export const get = async (url: string) => {
  try {
    let token = localStorage.getItem(token_label);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        [token_label]: token || "",
      },
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
      body: JSON.stringify(body),
    });
    const token = response.headers.get(token_label);
    localStorage.setItem(token_label, token || "");

    console.log(response.headers.get(token_label));

    const data = await response.json();
    if (response.ok) return data;
    else return new Error(data.error);
  } catch (error) {
    return error;
  }
};

export const remove = async (url: string) => {
  try {
    let token = localStorage.getItem(token_label);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        [token_label]: token || "",
      },
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
