import React from 'react';
import {Helmet} from 'react-helmet';
import MainContainer from "./styled-componets/MainContainer";
import User from "../../components/profile/atoms/User";
import {getCurrentUserData, getCurrentUserDecks} from "../../storage/user/userData";
import InfoWrapper from "./styled-componets/InfoWrapper";
import FlexGapContainer from "../../components/global/molecules/FlexGapContainer/FlexGapContainer";
import UserLabel from "../../components/global/atoms/UserLabel";
import Navbar from "../../components/global/atoms/Navbar";
import UserInfo from "../../components/global/atoms/UserInfo";
import UserStatistic from "../../components/battle/atoms/UserStatistic";
import ColumnGapContainer from "../../components/global/molecules/ColumnGapContainer";
import Line from "./styled-componets/Line";
import MyDeck from "../../components/profile/atoms/MyDeck";
import ButtonWithIcon from "../../components/global/atoms/ButtonWithIcon";
import theme from "../../utils/theme";
import pensil from '../../../assets/icons/pencil.svg';
import editProfil from '../../../assets/icons/editProfil.svg';

class Profile extends React.Component {

    state = {
        userData: {
            id: undefined,
            username: undefined,
            semester: undefined,
            image: undefined,
        },

        userDeck: undefined
    }

    async getUserData() {
        const data = await getCurrentUserData();
        this.setState({
            userData: {
                username: data.displayedUsername,
                id: data.user,
                semester: data.semester,
                image: data.image
            },
        });
    }

    async getDeck() {
        const data = await getCurrentUserDecks();
        this.setState({
            userDeck: data[0]
        });
    }

    componentDidMount() {
        this.getUserData();
        this.getDeck();
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Profil użytkownika</title>
                </Helmet>
                <Navbar/>
                <MainContainer>
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
                            <MyDeck/>
                        </ColumnGapContainer>
                        <ColumnGapContainer gap={'10px'}>
                            <ButtonWithIcon setWidth={'158px'} icon={pensil} color={theme.colors.dark}>
                                Edytuj talię
                            </ButtonWithIcon>
                            <ButtonWithIcon setWidth={'158px'} icon={editProfil} color={theme.colors.dark}>
                                Edytuj profil
                            </ButtonWithIcon>
                        </ColumnGapContainer>
                    </InfoWrapper>
                </MainContainer>
            </>
        );
    }
}

export default Profile;