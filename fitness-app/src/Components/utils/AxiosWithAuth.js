import axios from "axios";

export function getToken() {
  const userStr = localStorage.getItem("user");
  return JSON.parse(userStr).access_token;
}

export const AxiosWithAuth = () => {
  //add url in baseURL
  return axios.create({
    baseURL: "https://any-fitness.herokuapp.com/api/v1/",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

//alex11@mail.com
//!Alex@Here1
