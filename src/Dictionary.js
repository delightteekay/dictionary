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
    
function handleDictionResponse(response) {
setResults(response.data[0]);
}

function handlePexelsResponse(response) {   
setPhotos(response.data.photos);
}

function search() {
    
// documentation: https://dictionaryapi.dev/e

let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`; 
axios.get(apiUrl).then(handleDictionResponse);  

let pexelsApiKey = `563492ad6f91700001000001c8b1b4c0d3e5d4a2f9a7e3d1d6f8b7a9c5e2e7f1`;
let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
let headers = { Authorization: `${pexelsApiKey}` };
axios.get(pexelsApiUrl, { headers: headers }).then(handlePexelsResponse);

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
<h1>What word do you want to look up?</h1>
<form onSubmit={handleSubmit}>
<input type="search" onChange={handleKeywordChange} defaultValue={props.defaultKeyword} />
</form>
<div> className="hint" suggested words: sunset, yoga, wine, plant...</div>
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