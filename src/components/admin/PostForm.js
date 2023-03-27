import { useEffect, useState } from "react";

export default function PostForm({ savePost, post }){ 
    // De variabel (=produktattributter) som ikke kan ændres
    // Svare til fx var produktnavn = ""
    // Eller var pris = 0; 
    const [produktnavn, setProduktnavn] = useState("");
    const [beskrivelse, setBeskrivelse] = useState(""); 
    const [pris, setPris] = useState(0);
    const [varighed, setVarighed] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    // Hvis der er tal om opdatering (post er ikke tom), så sæt variable lige med eksisterne oplysninger. 
    // Ved opret skber der ingen ting.  Variable beholder "tommme" værdier.
    useEffect(() => { if (post) {
        setBeskrivelse(post.beskrivelse); 
        setProduktnavn(post.produktnavn); setPris(post.pris); 
        setVarighed(post.varighed);
          }
        }, [post]);

    // Funkiton som håndter "gem produkt" -> formular submittes. 
        async function handleSubmit(e) { 
            e.preventDefault();
            // Der oprettes er objket "formDate" med de oplysninger som blev idtastet i formularen
            const formData = {
            beskrivelse: beskrivelse, 
            produktnavn: produktnavn, 
            pris: parseFloat(pris), 
            varighed: parseInt(varighed)
            }

            // Tjekker om alle felter er udfyldt. Hvis ikke, udskiv fjelmedelelse.  
            const validForm = formData.beskrivelse && formData.produktnavn && formData.pris && formData.varighed;
if (validForm) { 
    savePost(formData);
} else {
setErrorMessage("Udfyld venligst alle felter.");
    } 
}

return (
    <form onSubmit={handleSubmit}>
    <label>
    Produktnavn<input type="text" name="produktnavn" value={produktnavn}
    placeholder="Indtast produktnavn" onChange={e => setProduktnavn(e.target.value)} /> 
    </label>
    <label>
    Beskrivelse<input type="text" name="beskrivelse" value={beskrivelse} placeholder="Indtast
    produktbeskrivelse" onChange={e => setBeskrivelse(e.target.value)} /> 
    </label>
    <label>
    Pris<input type="text" name="pris" value={pris} placeholder="Indtast pris" onChange={e =>
    setPris(e.target.value)} />
     </label>
    <label>
    Varighed<input type="text" name="varighed" value={varighed} placeholder="Indtast
    varighed" onChange={e => setVarighed(e.target.value)} />
     </label>
     
     <p className="tekst-fejl">{errorMessage}</p> 
     <button type="submit">Gem produkt</button> 
     </form>
); }