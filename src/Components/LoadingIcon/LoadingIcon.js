import "./LoadingIcon.scss";
import React from "react";


export default function LoadingIcon(props) {
    let width = props.width;
    let height = props.height;
    return <div className="loading-icon" style={{width: `${width}px`, height: `${height}px`}}/>

}