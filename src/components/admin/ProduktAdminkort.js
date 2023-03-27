import { useNavigate } from "react-router-dom";
export default function  ProduktAdminkort({post}) {
    const navigate = useNavigate();

// Når bruger klikker på produktkort.
// Dirigeres bruger til formularside.
// Post.id er kortets unkikke placering i produktlisten.
    function opdaterKlik(){
        navigate (`posts/${post.id}`);
    }

    return(
        <div className="kort adminkort" onClick={opdaterKlik}>
            <div className="tekst">
                <h3>{post.produktnavn}</h3>
                <p>{post.beskrivelse}</p>
                <hr/>
                <p>Varighed: {post.varighed} min.</p>
                <p>Pris kr. {post.pris}</p>
            </div>
         </div>
    );
}