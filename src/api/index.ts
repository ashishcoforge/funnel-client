import { SESSION_KEY } from "../enums";

const GetApi = async (url: string) => {
  const token = sessionStorage.getItem(SESSION_KEY.TOKEN);

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

const PostApi = async (url: string, payload: any) => {
  const token = sessionStorage.getItem(SESSION_KEY.TOKEN);

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
};

export { GetApi, PostApi };
