import React from 'react';
import Label from "./styled-components/Label";
import DivImageInput from "./styled-components/DivImageInput";
import AvatarImagePreview from "./styled-components/AvatarImagePreview";
import upload_image_dark from "../../../../../assets/icons/upload_image_dark.svg";
import ImageInput from "./styled-components/ImageInput";
import ImageInputPrompt from "./styled-components/ImageInputPrompt";
import Div from "./styled-components/Div";

class UserAvatarInput extends React.Component {
    render() {
        return (
            <Div>
                <Label htmlFor='avatar'>
                    Ikona Profilu
                </Label>
                <DivImageInput>
                    <AvatarImagePreview
                        src={this.props.currentAvatar ? this.props.currentAvatar : upload_image_dark}
                        alt='Załadowany obrazek/ikona'/>
                    <ImageInput id='avatar' name='avatar' type='file' accept='image/png, .jpg, .svg'
                                onChange={this.props.updateAvatar}/>
                    <ImageInputPrompt>Wybierz z pliku</ImageInputPrompt>
                </DivImageInput>
            </Div>
        );
    }
}

export default UserAvatarInput;