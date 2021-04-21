import React from "react";
import "./ShowMoreButton.scss";

import showMore from "../../../../assets/icons/more.svg";

function ShowMoreButton() {
    return (
        <button className="ShowMoreButton" onClick={() => {console.log("showMore button clicked");}}>
            <img className="ShowMoreButton__icon" src={showMore} alt="Ikona więcej opcji - trzy kropki."/>
        </button>
    );
}

export default ShowMoreButton;