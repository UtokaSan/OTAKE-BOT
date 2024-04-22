import axios from "axios";

const getAllCard = async () => {
    try {
        const response = await axios.get("http://localhost:3000/card/");
        return response.data;
    } catch (error) {
        throw error;
    }
}


const getAllCardWithOneUserId = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/card/user/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const editCard = async (id, name, rarity, Attack, Life, owner_id) => {
    try {
        const response = await axios.patch(`http://localhost:3000/card/${id}`, {
            "name": name,
            "rarity": rarity,
            "attack": Attack,
            "pv": Life,
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
        const response = await axios.delete(`http://localhost:3000/card/${id}`);
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