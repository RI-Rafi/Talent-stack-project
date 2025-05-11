import { useState } from "react";
// import './CSS/App.css';

function Ranking() {
    const [rankings, setRankings] = useState(0);

    function addRanking() {
        setRankings(rankings + 100);
    }
    function removeRanking() {
        setRankings(rankings - 100);
    }
    return (
        <div className="box s15">
            <h1>{rankings}</h1>
            <button className= 'button'onClick={addRanking}>Add</button>
            <button className= 'button' onClick={removeRanking}>Sub</button>
        </div>
    );
}
 export default Rankingddddddd;