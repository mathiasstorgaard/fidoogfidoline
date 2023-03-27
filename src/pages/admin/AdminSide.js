
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Produktkort from "../../components/admin/ProduktAdminkort";

export default function AdminSide() {
    //"postes" kome rtil at indeholde alle podukter i en liste (array) 
const [posts, setPosts] = useState([]);
    // isPost kan være ture eller false. Hvis ignen produkter ekstiserer, så er isPoats false.
const [isPosts, setIsPosts] = useState(true); // isPosts can be true or false const navigate = useNavigate();
const navigate = useNavigate ();

    // Funktion (hook) som henter produkter fra firebase datebase
useEffect(() => {
async function getPosts() {
const url = "https://fidofidoline-e91c9-default-rtdb.europe-west1.firebasedatabase.app/produkter.json"; 
const response = await fetch(url);
    // Date indholder al indhold fra produkt database 
const data = await response.json();
    // Er der produkter? 
if (data !== null) {
const postsArray = Object.keys(data).map((key) => ({ 
    id: key,
...data[key],
}));
    // Variabel "posts" bliver lig med listen af produkter.
setPosts(postsArray); 
} else {
    // Sætter variabel isPosts til false, for der er ingen produkter
setIsPosts(false); 
    }
}
getPosts(); 
}, []);
    // Eventer handler for kilk på opret knap
function opretklik() { 
    navigate("/create");
}

return ( 
<main>
<h1>
Administration af produkter
<button type="button" onClick={opretklik}>+ Opret produkt</button>
</h1> 

{isPosts ? (
<div className="kortraekke"> 
{posts.map((post) => (
<Produktkort key={post.id} post={post} /> 
    ))}
</div> 
) :(
<p>Ingenting at vise</p> )}
</main> 
);
}
