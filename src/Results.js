import React from "react";

export default function Results(props) {
    if (props.results) {
        return (
            <div className="Results">
            <h2>{props.results.word}</h2>
            <p>{props.results.meanings[0].definitions[0].definition}</p>
            <Meaning meaning={props.results.meanings[0]} />
            </div>
        );
    } else {
        return null;
    } 

}