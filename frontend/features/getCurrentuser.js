import api from "../utils/axios"

const getCurrentUser = async () => {
    try {
        const response = await api.get("/api/me");
        console.log("Data:", response.data.name);

        return response.data;
    } catch (error) {

        console.log("Data:", error);
        return null;
    }
};
export default getCurrentUser