import axios from "axios";

const getAllUser = async () => {
    // console.log("email : ", email, "password : ", password);
    try {
        console.log("print")
        const response = await axios.get("http://localhost:3000/user/");
        await console.log(response)
        await console.log("response : ")
        await console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getOneUser = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/user/${id}`);
        // await console.log("response : ")
        // await console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

const editUser = async (id, params) => {

    console.log("id : ", id)

    try {
        const response = await axios.patch(`http://localhost:3000/user/${id}`, {
            "money": params.userMoney.toString(),
            "win": params.userWin.toString(),
            "loose": params.userLoose.toString()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3001/user/${id}`);
        await console.log("delete response")
        return response.data;
    } catch (error) {
        throw error;
    }
}

export {
    getAllUser,
    getOneUser,
    editUser,
    deleteUser
};