import React, { useEffect } from 'react'
import '../styles/pages/homePage.scss';
import BasicTable from "../components/PlayerTable/PlayerTable.jsx";
import { getAllUser } from "../services/userService.js";

function Home() {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        getAllUser().then((data) => {
            setRows(data);
            setLoading(false);
            console.log("data : ", data);
            console.log("loading : ", loading);
        });
    }, []);

    // function createData(id, name, rarity, calories, fat, carbs, protein, readMore) {
    //     return {id, name, rarity, calories, fat, carbs, protein, readMore};
    // }
    //
    // // const rows = [
    // //     createData(1, 'Loading', "Loading", "Loading", "Loading", "Loading", "Loading",
    // //         <a
    // //             href="http://google.com">Loading</a>)]

    return (
        <div id="div__homePage">
            <h1> HomePage</h1>
            {loading ?
                <h1>Loading...</h1> :
                <BasicTable rows={rows}/>}


            {/*<ContainerTableauPlayer/>*/}
        </div>
    )
}

export default Home