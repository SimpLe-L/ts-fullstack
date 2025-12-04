import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

//#region src/useRquest.ts
const requestInstance = axios.create({ baseURL: { baseUrl: "/api" }.baseUrl });
requestInstance.interceptors.request.use((config) => {
	return config;
}, (error) => {
	return Promise.reject(error);
});
requestInstance.interceptors.response.use((response) => {
	return response;
}, (error) => {
	const { response } = error;
	if (!response) return Promise.reject(error);
	const { data, status } = response.data;
	data.message;
	switch (status) {
		case 401: break;
		case 403: break;
		case 404: break;
		case 500: break;
		default: break;
	}
	return Promise.reject(error);
});
function useRequest() {
	return {
		requestInstance,
		axios: requestInstance
	};
}

//#endregion
//#region src/user.ts
const useGetUserQuery = () => {
	const { requestInstance: requestInstance$1 } = useRequest();
	return useQuery({
		queryKey: ["user-list"],
		queryFn: async () => {
			const { data } = await requestInstance$1.get("/users");
			return data;
		}
	});
};
const useGetUserInfoQuery = (id) => {
	const { requestInstance: requestInstance$1 } = useRequest();
	return useQuery({
		queryKey: ["user-info", id],
		queryFn: async () => {
			const { data } = await requestInstance$1.get(`/users/${id}`);
			return data;
		}
	});
};
const useCreateUserMutation = () => {
	const { requestInstance: requestInstance$1 } = useRequest();
	return useMutation({
		mutationFn: async (user) => {
			const { data } = await requestInstance$1.post("/users", user);
			return data;
		},
		onSuccess: () => {
			useQueryClient().invalidateQueries({ queryKey: ["user-list"] });
		}
	});
};

//#endregion
export { useCreateUserMutation, useGetUserInfoQuery, useGetUserQuery };