
import { useEffect, useState } from "react";
import Produktkort from "../components/Produktkort";
import hundforside from "../images/dog.jpg";

export default function Forside() {
    // Posts kommer til at indholder listen af hundelejeprodukter 
    const [posts, setPosts] = useState([]);
    // "isPosts" kan være enten "true" (hvis der er podukter) eller
    //"false" hvis ingen proukter der er.
    const [isPosts, setIsPosts] = useState(true);

    // Data hentes fra firebase og gemmes i "post" variabel 
    useEffect(() => {
        async function getPosts() {
        const url = "https://fidofidoline-e91c9-default-rtdb.europe-west1.firebasedatabase.app/produkter.json";
        
        // Vent indtil response modtager postivt svar fra firebase
        const response = await fetch(url); 
        // Læg json data (list fra produkt) over i variabelen "data"
        const data = await response.json(); if (data !== null) {

        // Tjek om der faktisk er pordukter på listen (posetiv hvis 
        // forskellig fra null)
            const postsArray = Object.keys(data).map((key) => ({ 
                id: key,
            ...data[key],
            }));
            setPosts(postsArray);
             } else {
            setIsPosts(false);
             }
            }
            getPosts(); 
            }, []);

    return (
      <main>
          <div className="forsidebillede">
            <img src={hundforside} alt="Billede hund forside" className="herobillede" />
          </div>
          {isPosts ? (
    <div className="kortraekke">
        {posts.map((post) => (
          <Produktkort key={post.id} post={post} />
    ))} 
    </div>
    ): (
    <p>Ingen produkter at vise</p>
    )}
      </main>
    )
}

// Kommer til linje 45 til 43
// Hvis der er podukter at vise (isPostes = true), så går programmet i løkke
// (posts.map) - hvor hvert element (post) på listen (posts), vis produktkort 
// for produktet.