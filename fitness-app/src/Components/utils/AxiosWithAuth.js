import axios from "axios";

export function getToken() {
	return localStorage.getItem("token");
}

export const AxiosWithAuth = () => {
	//add url in baseURL
	return axios.create({
		baseURL: "",
		headers: {
			Authorization: getToken(),
		},
	});
};
