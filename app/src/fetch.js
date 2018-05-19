import { either, equals, where } from "ramda";
import { getToken, clearToken } from "./auth";
import { pushRoute } from "./history";
import fetchPonyfill from "fetch-ponyfill";

const { Headers, fetch } = fetchPonyfill();
const checkResponse = where({
	statusText: either(equals("Unauthorized"), equals("Internal Server Error")),
	status: equals(500),
});
const gotoLoginRoute = pushRoute("/login", true);

export default function(method, api, params) {
	const token = getToken();
	if (!token) throw new Error("No token present. Login again");

	const headers = new Headers({
		authorization: `Bearer ${token}`,
	});

	let settings = {
		headers,
		method,
		cache: "default",
	};

	if (method === "POST" || method === "PUT") {
		headers.append("Content-Type", "application/json");
		settings = {
			headers,
			body: JSON.stringify(params),
			method,
			cache: "default",
		};
	}

	return fetch(api, settings).then(response => {
		if (response.ok) return response.json();

		if (checkResponse(response)) {
			clearToken();
			return gotoLoginRoute();
		}
		return response.json().then(err => Promise.reject(err));
	});
}
