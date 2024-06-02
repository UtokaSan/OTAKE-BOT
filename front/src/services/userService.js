import axios from "axios";
import Cookies from "js-cookie";

const getAllUser = async () => {
    // console.log("email : ", email, "password : ", password);
    try {
        const response = await axios.get("http://localhost:3000/user/");
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getOneUser = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/user/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// const getConnected = async () => {
//
// }

const getJWTToken = () => {
    const savedToken = Cookies.get('jwt');
    console.log("savedToken : ", savedToken);
    return savedToken;
}

const editUser = async (id, params) => {
    try {
        const response = await axios.patch(`http://localhost:3000/user/${id}`, {
            "jwt": getJWTToken(),
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
        console.log("Ser id : ", id);
        const response = await axios.delete(`http://localhost:3000/user/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                jwt: getJWTToken(),
            },
        });
        // await console.log("response.data : ", response.data)
        return response.data;
    } catch (error) {
        console.log("error");
        console.log(error.response.data.message);
        throw error.response.data.message;
    }
}

export {
    getAllUser,
    getOneUser,
    editUser,
    deleteUser
};