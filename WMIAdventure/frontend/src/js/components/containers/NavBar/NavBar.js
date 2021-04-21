import React from "react";
import "./NavBar.scss";

function NavBar({logo, notification, profile, showMore}) {
    return (
        <header className="NavBar">
            <nav className="NavBar__navigation">
                {logo}
                <div className="NavBar__icons">
                    {notification}
                    {profile}
                    {showMore}
                </div>
            </nav>
        </header>
    );
}

export default NavBar;