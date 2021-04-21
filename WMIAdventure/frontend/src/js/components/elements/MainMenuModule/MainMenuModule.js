import React from "react";
import {Link} from "react-router-dom";

function MainMenuModule({header, describe, link}) {
    return (
        <Link className="MainMenuModule" to={link}>
            <p className="MainMenuModule__header">
                {header}
            </p>
            <p className="MainMenuModule__describe">
                {describe}
            </p>
        </Link>
    );
}