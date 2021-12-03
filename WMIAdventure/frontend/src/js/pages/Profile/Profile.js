import React from 'react';
import {Helmet} from 'react-helmet';
import MainContainer from "./styled-componets/MainContainer";
import User from "../../components/profile/atoms/User";
import {getCurrentUserData} from "../../storage/user/userData";
import InfoWrapper from "./styled-componets/InfoWrapper";
import FlexGapContainer from "../../components/global/molecules/FlexGapContainer/FlexGapContainer";
import UserLabel from "../../components/global/atoms/UserLabel";
import Navbar from "../../components/global/atoms/Navbar";
import UserInfo from "../../components/global/atoms/UserInfo";
import UserStatistic from "../../components/battle/atoms/UserStatistic";
import ColumnGapContainer from "../../components/global/molecules/ColumnGapContainer";
import Line from "./styled-componets/Line";
import MiniCard from "../../components/profile/atoms/MiniCard";

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
                    <Navbar/>
                    <User username={this.state.userData.username}
                          image={this.state.userData.image}/>
                    <InfoWrapper>
                        <ColumnGapContainer gap={'20px'} setWidth={'100%'}>
                            <ColumnGapContainer gap={'10px'}>
                                <FlexGapContainer gap={'10px'}>
                                    <UserLabel term number={this.state.userData.semester}/>
                                    <UserLabel level number={'50'}/>
                                    <UserLabel rank number={'2'}/>
                                </FlexGapContainer>
                                <FlexGapContainer gap={'10px'}>
                                    <UserInfo label={'Wygrane'} value={'24'}/>
                                    <UserInfo label={'Przegrane'} value={'24'}/>
                                    <UserInfo label={'Ratio'} value={'50%'}/>
                                </FlexGapContainer>
                                <UserStatistic statisticNumber={'25'} type={'level'} currentLvlValue={'50'}/>
                            </ColumnGapContainer>
                            <Line/>
                            <MiniCard borderDown/>
                            {/*twoja talia*/}
                        </ColumnGapContainer>
                        {/*edit deck & profil block*/}
                    </InfoWrapper>
                </MainContainer>
            </>
        );
    }
}

export default Profile;