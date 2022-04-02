import React from "react";
import './Content.css';
import ContentCard from "./ContentCard/ContentCard";

export default props => (
        <div className="body-content">
            <div style={{display: "flex"}}>
            <ContentCard/>
            <ContentCard/>
            <ContentCard/>

            </div>
        </div>

)