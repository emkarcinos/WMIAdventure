import React from 'react';
import {Helmet} from 'react-helmet';
import MainMobileContainer from "./styled-componets/MainMobileContainer";
import User from "../../components/profile/atoms/User";
import {getCurrentUserData, getCurrentUserDecks} from "../../storage/user/userData";
import InfoWrapper from "./styled-componets/InfoWrapper";
import FlexGapContainer from "../../components/global/molecules/FlexGapContainer/FlexGapContainer";
import UserLabel from "../../components/global/atoms/UserLabel";
import UserInfo from "../../components/global/atoms/UserInfo";
import UserStatistic from "../../components/battle/atoms/UserStatistic";
import ColumnGapContainer from "../../components/global/molecules/ColumnGapContainer";
import Line from "./styled-componets/Line";
import ButtonWithIcon from "../../components/global/atoms/ButtonWithIcon";
import theme from "../../utils/theme";
import editProfil from '../../../assets/icons/editProfil.svg';
import {cardsFromDeckData} from "../../api/data-models/battle/Card";
import Navbar from "../../components/global/molecules/Navbar";
import Media from "react-media";
import {desktop, mobile, nextStepAnimationDuration} from "../../utils/globals";
import MainDesktopContainer from "./styled-componets/MainDesktopContainer";
import LeftProfileContainer from "./styled-componets/LeftProfileContainer";
import RightDeckContainer from "./styled-componets/RightDeckContainer";
import {Redirect} from "react-router-dom";
import {EditableDeck, nullEditableDeck} from "../../api/data-models/battle/EditableDeck";
import MyDeck from "../../components/profile/molecules/MyDeck";
import DeckHeader from "./styled-componets/DeckHeader";
import PopUpProfile from "../../components/profile/organisms/PopUpProfile";
import EditProfile from "../../components/profile/molecules/EditProfile";
import P from "./styled-componets/P";

class Profile extends React.Component {

    state = {
        userData: {
            id: undefined,
            username: undefined,
            semester: undefined,
            image: undefined,
        },

        userNotLoggedIn: false,
        deck: nullEditableDeck(),

        editProfilePopUp: {
            visible: false,
            opacity: '0',
            translateX: '-100vh'
        },
    }

    openEditProfilePopUp = () => {
        this.setState({
            editProfilePopUp: {
                visible: true,
            },
        });

        setTimeout(() => {
            this.setState({
                editProfilePopUp: {
                    visible: true,
                    opacity: '1',
                    translateX: '0'
                },
            })
        }, 5);
    }

    closeEditProfilePopUp = () => {
        this.setState({
            editProfilePopUp: {
                visible: true,
                opacity: '0',
                translateX: '-100vh'
            },
        });

        setTimeout(() => {
            this.setState({
                editProfilePopUp: {
                    visible: false,
                },
            })
        }, nextStepAnimationDuration);
    }

    async getUserData() {
        const data = await getCurrentUserData();
        if (data) {
            this.setState({
                userData: {
                    username: data.displayedUsername,
                    id: data.user,
                    semester: data.semester,
                    image: data.image
                },
            });
        } else {
            this.setState({userNotLoggedIn: true});
        }
    }

    async getDeck() {
        const data = await getCurrentUserDecks();
        if (!data)
            return;

        const userSpecificCards = await cardsFromDeckData(data);
        this.setState({deck: new EditableDeck(userSpecificCards)});
    }

    componentDidMount() {
        this.getUserData();
        this.getDeck();
    }

    render() {
        if (this.state.userNotLoggedIn)
            return (<Redirect to={'/'}/>);
        return (
            <>
                <Helmet>
                    <title>Profil użytkownika</title>
                </Helmet>
                <Navbar/>
                <Media query={mobile}>
                    <>
                        <MainMobileContainer>
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
                                    <MyDeck deck={this.state.deck}/>
                                    <P>Dotknij kartę aby zmodyfikować talię</P>
                                </ColumnGapContainer>
                                <ColumnGapContainer gap={'10px'}>
                                    <ButtonWithIcon setWidth={'158px'} icon={editProfil}
                                                    handler={this.openEditProfilePopUp}
                                                    color={theme.colors.dark}>
                                        Edytuj profil
                                    </ButtonWithIcon>
                                </ColumnGapContainer>
                            </InfoWrapper>
                        </MainMobileContainer> {
                        this.state.editProfilePopUp.visible ? <PopUpProfile
                            setOpacity={this.state.editProfilePopUp.opacity}
                            setTranslateX={this.state.editProfilePopUp.translateX}
                            closeHandler={this.closeEditProfilePopUp}>
                            <EditProfile closeHandler={this.closeEditProfilePopUp}
                                         userId={this.state.userData.id}
                                         username={this.state.userData.username}
                                         avatar={this.state.userData.image}/>
                        </PopUpProfile> : null
                    }</>
                </Media>
                <Media query={desktop}>
                    <>
                        <MainDesktopContainer>
                            <LeftProfileContainer>
                                <ColumnGapContainer gap={'40px'}>
                                    <User username={this.state.userData.username}
                                          image={this.state.userData.image}/>
                                    <ColumnGapContainer gap={'30px'}>
                                        <FlexGapContainer gap={'40px'}>
                                            <UserLabel term number={this.state.userData.semester}/>
                                            <UserLabel level number={'50'}/>
                                            <UserLabel rank number={'2'}/>
                                        </FlexGapContainer>
                                        <FlexGapContainer gap={'40px'}>
                                            <UserInfo label={'Wygrane'} value={'24'}/>
                                            <UserInfo label={'Przegrane'} value={'24'}/>
                                            <UserInfo label={'Ratio'} value={'50%'}/>
                                        </FlexGapContainer>
                                        <UserStatistic statisticNumber={'25'} type={'level'} currentLvlValue={'50'}/>
                                    </ColumnGapContainer>
                                </ColumnGapContainer>
                                <ButtonWithIcon setWidth={'158px'} icon={editProfil}
                                                handler={this.openEditProfilePopUp}
                                                color={theme.colors.dark}>
                                    Edytuj profil
                                </ButtonWithIcon>
                            </LeftProfileContainer>
                            <RightDeckContainer>
                                <DeckHeader>
                                    Twoja talia
                                </DeckHeader>
                                <MyDeck deck={this.state.deck}/>

                                <P>Klinkij na kartę aby zmodyfikować talię</P>
                            </RightDeckContainer>
                        </MainDesktopContainer>
                        {
                            this.state.editProfilePopUp.visible ? <PopUpProfile
                                setOpacity={this.state.editProfilePopUp.opacity}
                                setTranslateX={this.state.editProfilePopUp.translateX}
                                closeHandler={this.closeEditProfilePopUp}>
                                <EditProfile closeHandler={this.closeEditProfilePopUp}
                                             userId={this.state.userData.id}
                                             username={this.state.userData.username}
                                             avatar={this.state.userData.image}/>
                            </PopUpProfile> : null
                        }
                    </>
                </Media>
            </>
        )

    }
}

export default Profile;