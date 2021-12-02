import React from 'react';
import {Helmet} from 'react-helmet';
import NavBar from '../../components/prototype/organisms/NavBar';
import MainContainer from "./styled-componets/MainContainer";
import User from "../../components/profile/atoms/User";
import {getCurrentUserData} from "../../storage/user/userData";
import InfoWrapper from "./styled-componets/InfoWrapper";
import FlexGapContainer from "../../components/global/molecules/FlexGapContainer/FlexGapContainer";
import UserLabel from "../../components/global/atoms/UserLabel";

class Profile extends React.Component {

    state = {
        userData: {
            id: undefined,
            username: undefined,
            semester: undefined,
            image: undefined,
        }
    }

    componentDidMount() {
        getCurrentUserData()
            .then(user => user ? this.setState({
                userData: {
                    username: user.displayedUsername,
                    id: user.user,
                    semester: user.semester,
                    image: user.image
                }
            }) : null);
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Profil użytkownika</title>
                </Helmet>
                <MainContainer>
                    <NavBar/>
                    <User username={this.state.userData.username}
                          image={this.state.userData.image}/>
                    <InfoWrapper>
                        <FlexGapContainer gap={'10px'}>
                            <UserLabel term number={this.state.userData.semester}/>
                            <UserLabel level number={'50'}/>
                            <UserLabel rank number={'2'}/>
                        </FlexGapContainer>
                    </InfoWrapper>
                </MainContainer>
            </>
        );
    }
}

export default Profile;