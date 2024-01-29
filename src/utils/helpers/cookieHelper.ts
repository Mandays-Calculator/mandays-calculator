import Cookies from "js-cookie";

export const getCookie = (name: string) => {
  if (name) {
    const cookieItem = Cookies.get(name);
    try {
      return JSON.parse(cookieItem || "");
    } catch (e) {
      console.error(`Error parsing cookie "${name}":`, e);
      return cookieItem;
    }
  }
  return null;
};

export const setCookie = (name: string, value: any, properties?: any) => {
  if (name) {
    Cookies.set(name, JSON.stringify(value), {
      expires: 0.5,
      secure: true,
      sameSite: "strict",
      path: "/",
      ...properties,
    });
  }
};

export const removeCookie = (name: string) => {
  if (name) {
    Cookies.remove(name);
  }
};
