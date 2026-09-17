import api from "../utils/axios";

async function getMessage(id) {
    try {
        const { data } = await api.get(`/api/chat/get-message/${id}`)
        console.log(data,"data");
        return data
    } catch (error) {
        console.log(error);

    }
}
export default getMessage