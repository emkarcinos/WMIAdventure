import React from "react";
import MenubarEntry from "../../atoms/MenubarEntry";
import Div from "./styled-components/Div";

class Menubar extends React.Component {

    render() {
        return (
            <>
                <Div>
                    <MenubarEntry/>
                </Div>
            </>
        )
    }
}

export default Menubar;