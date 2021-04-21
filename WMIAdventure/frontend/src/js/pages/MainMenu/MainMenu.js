import React from "react";
import "./MainMenu.scss";

import NavBar from "../../components/containers/NavBar";
import NotificationButton from "../../components/elements/NotificationButton";
import ShowMoreButton from "../../components/elements/ShowMoreButton";
import ProfileButton from "../../components/elements/ProfileButton";
import Logo from "../../components/elements/Logo";

function MainMenu() {
    return (
        <div className="MainMenu">
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
        </div>
    );
}

export default MainMenu;