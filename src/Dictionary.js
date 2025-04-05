import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";
import Photos from "./Photos";


export default function Dictionary(props) {
    let [keyword, setKeyword] = useState(props.defaultKeyword);  
    let [results, setResults] = useState(null);
    let [loaded, setLoaded] = useState(false);
    let [photos, setPhotos] = useState(null);
    
    function handleDictionaryResponse(response) {
        setResults(response.data[0]);
    }

    function handlePexelsResponse(response) {   
        console.log(response.data.photos);
        setPhotos(response.data.photos);
    }

    function search() {
    
     // documentation: https://dictionaryapi.dev/

    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`; 
    axios.get(apiUrl).then(handleDictionaryResponse);  

    let pexelsApiKey = `563492ad6f91700001000001c8b1b4c0d3e5d4a2f9a7e3d1d6f8b7a9c5e2e7f1`;
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=6`;
    axios
        .get(pexelsApiUrl, {
            headers: { Authorization: `Bearer ${pexelsApiKey}` },
        })
        .then(handlePexelsResponse);
    }

    function handleSubmit(event) {
        event.preventDefault();
        search();
    }
        
     function handleKeywordChange(event) {
        setKeyword(event.target.value);
    }

    function load() {
        setLoaded(true);
        search();
    }

    if (loaded) {
        return (
            <div className="Dictionary">
            <section>
            <h2>What word do you want to look up?</h2>
            <form onSubmit={handleSubmit}>
            <input type="search" onChange={handleKeywordChange} defaultValue={props.defaultKeyword} />
            </form>
            <div> className="hint" suggestion: sunset, yoga, wine...</div>
            </section>
            <Results results={results} />
            <Photos photos={photos} />
            </div>
        );
} else {
    load();
    return "Loading...";
}


    
   
}