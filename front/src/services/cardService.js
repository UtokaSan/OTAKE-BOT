import axios from "axios";

const getAllCard = async () => {
    // console.log("email : ", email, "password : ", password);
    try {
        console.log("print")
        const response = await axios.get("http://localhost:3000/card/");
        await console.log(response)
        await console.log("response : ")
        await console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

const deleteCard = async (id) => {
    // console.log("email : ", email, "password : ", password);
    try {
        console.log("print")
        const response = await axios.delete(`http://localhost:3000/card/${id}`);
        await console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}


export {
    getAllCard,
    deleteCard
};