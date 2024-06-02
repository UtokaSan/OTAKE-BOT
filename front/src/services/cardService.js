import axios from "axios";
import Cookies from "js-cookie";

const getJWTToken = () => {
    const savedToken = Cookies.get('jwt');
    console.log("savedToken : ", savedToken);
    return savedToken;
}


const getAllCard = async () => {
    try {
        const response = await axios.get("http://localhost:3000/card/");
        console.log("res : ", response)
        return response.data;
    } catch (error) {
        throw error;
    }
}


const getAllCardWithOneUserId = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/card/user/${id}`);
        await console.log("res : ", response);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const editCard = async (id, name, rarity, Attack, Life, Price, owner_id) => {
    try {
        const response = await axios.patch(`http://localhost:3000/card/${id}`, {
            "jwt": getJWTToken(),
            "name": name,
            "rarity": rarity,
            "attack": Attack,
            "pv": Life,
            "price": Price,
            "owner_id": owner_id
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const deleteCard = async (id) => {
    // console.log("email : ", email, "password : ", password);
    try {
        console.log("print");
        const response = await axios.delete(`http://localhost:3000/card/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                jwt: getJWTToken(),
            },
        });
        await console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export {
    getAllCard,
    getAllCardWithOneUserId,
    editCard,
    deleteCard
};