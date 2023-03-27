import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../../components/admin/PostForm";

export default function OpdateringsSide() {

  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const params = useParams();

  // Params.postId  er lig med det produkt-index som nbrugen kilikker på for at opdater 
  const url = `https://fidofidoline-e91c9-default-rtdb.europe-west1.firebasedatabase.app/produkter/${params.postId}.json`;

  // Finde date om det produkt som brugeren klikkede på.
  useEffect(() => {
    async function getPost() {
      const response = await fetch(url);
      const data = await response.json();
     // post variablen indholder oplysninger om det valgte produkt.
      setPost(data);
    }
    getPost();
  }, [url]);

  // Funkiton gemmer ændrede oplysninger
  async function savePost(postToUpdate) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(postToUpdate)
    });
    const data = await response.json();
    console.log(data);
    // Efter "gem produkt" sendes brugeren til admin/ -> AdminSiden
    navigate("/admin");
  }

  // Funktion sletter produkt 
  async function deletePost() {
    const bekraeftSletning = window.confirm(`Vil du slette produktet "${post.produktnavn}"?`)
   
    // Klikker brugeren ok til bekræft sletning, slettes produkt.
    if (bekraeftSletning) {
        const url = "https://fidofidoline-e91c9-default-rtdb.europe-west1.firebasedatabase.app/produkter.json";
        const firstResponse = await fetch(url);
        const firstData = await firstResponse.json();

        firstData.splice(params.postId, 1); // Delete element from array
       
        const response = await fetch(url, {
            method: "PUT", // Overwrites database
            body: JSON.stringify(firstData) // Rewrite database
        });

        const data = await response.json();
        console.log(data);
        // Efter "sletning" går browerseren til andmin/ -> AdminSiden
        navigate("/admin");
      }

  }

  return (
    <section className="page">
      <h1>Opdatér produkt</h1>
      <PostForm post={post} savePost={savePost} />
      <button className="btn-delete" onClick={deletePost}>
        Slet produkt
      </button>
    </section>
  );

}