import { useNavigate } from "react-router-dom";
import PostForm from '../../components/admin/PostForm';

export default function OpretSide() {
    const navigate = useNavigate();

    async function createPost(newPost) {
       
        const url = "https://fidofidoline-e91c9-default-rtdb.europe-west1.firebasedatabase.app/produkter.json";
        const firstResponse = await fetch(url);
        let firstData = await firstResponse.json();
       
        if (firstData === null) { // Hvis der ikke er nogle produkter...
            firstData = [] // Opret nyt produkt 
        }

        firstData.push(newPost); // Tilføj ny post til produkt list

        const response = await fetch(url, {
            method: "PUT", // Overwrites database
            body: JSON.stringify(firstData) // Rewrite database
        });
        const data = await response.json();
        console.log(data);
        navigate("/admin");
    }

    return (
       <section className="page">
        <h1>Opret nyt produkt</h1>
            <PostForm savePost={createPost} />
       </section>
    );
}