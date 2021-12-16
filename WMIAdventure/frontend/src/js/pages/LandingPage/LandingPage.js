import React from 'react';
import Main from "./styled-components/Main";
import LandingNavBar from "../../components/landing-page/molecules/LandingNavBar";
import LandingHeroSection from "../../components/landing-page/molecules/LandingHeroSection";
import LandingArticle from "../../components/landing-page/molecules/LandingArticle";
import cardIcon from '../../../assets/images/cardIcon.png';
import LandingSection from "../../components/landing-page/organisms/LandingSection";
import battleIcon from '../../../assets/images/battleIcon.png';
import pencilDark from '../../../assets/icons/pencil-dark.svg';
import levelUpDark from '../../../assets/icons/level-up-dark.svg';
import devices from '../../../assets/images/devices.png';
import github from '../../../assets/images/github.png';
import LandingFooter from "../../components/landing-page/atoms/LandingFooter";

class LandingPage extends React.Component {
    render() {
        return (
            <>
                <LandingNavBar/>
                <Main>
                    <LandingHeroSection/>
                    <LandingSection>
                        <LandingArticle header='Karty ze świata informatyki'
                                        image={cardIcon}
                                        paragraph='Podczas studiów oraz przygód z programowaniem poznajemy wiele różnych
                                        rzeczy oraz pojęć. Czasami wręcz nie możemy zapomnieć o pewnych technologicznych
                                        niuansach czy przeżyciach. Bez obaw! WMI Adventure sprawi, że te wspomnienia
                                        jeszcze bardziej będą Cię nękać, ponieważ wszystko w tej aplikacji
                                        opiera się na reprezentujących je kartach.'/>
                        <LandingArticle header='Pojedynki'
                                        image={battleIcon}
                                        paragraph='Życie to wieczna walka o przetrwanie i pamięć RAM.
                                        Na studiach pojawia się rywalizacja, która budzi w nas czasami dzikie emocje.
                                        Dlatego stworzyliśmy możliwość wyzwolenia tych uczuć poprzez walkę
                                        informatycznymi kartami ze studentami, prowadzącymi oraz absolwentami.
                                        Chcesz udowodnić, że jesteś lepszy? Masz ochotę zobaczyć jakiś rezultat na
                                        monitorze po setkach godzin nieudanego kodowania? Włącz WMI Adventure,
                                        zbierz karty a następnie wyzwyj kogoś na pojedynek!'/>
                        <LandingArticle header='Bądź również twórcą!'
                                        image={pencilDark}
                                        paragraph='Każdy posiada własne skojarzenia i ulubione aspekty ze studiów na WMI
                                        lub świata IT. Nasza platforma pozwala na tworzenie własnych kart, które będą
                                        stawać na polu bitwy! To miejsce potrzebuje takich ludzi jak Ty, ponieważ
                                        każde informatyczne doświadczenie pozwoli je wzbogacić. Twoje umiejętności
                                        nie grają tutaj jedynej istotnej roli, ale również kreatywność!'/>
                        <LandingArticle header='Rośnij w siłę'
                                        image={levelUpDark}
                                        paragraph='Razem z ilością wygranych pojedynków i stworzonych przez Ciebie kart
                                        Twój poziom doświadczenia będzie wzrastać. Osiągając kolejne poziomy będziesz
                                        zdobywać punkty nauki za które ulepszysz swoje ulubione karty. Nie daj się
                                        wyprzedzić innym! Jeśli będziesz najbardziej pomysłowy oraz regularnie będziesz
                                        miażdżyć swoich przeciwników możesz stać się najpotężniejszy na WMI!'/>
                        <LandingArticle header='Aplikacja dostępna na każdym urządzeniu'
                                        image={devices}
                                        paragraph='Jedziesz aktualnie tramwajem? Jesteś na spacerze? Kodzisz właśnie Microshella?
                                        To wszystko nie jest ważne, ponieważ zawsze możesz odpalić WMI Adventure
                                        na dowolnym sprzęcie. Zapewniamy pełen dostęp na komputery i smartfony.'/>
                        <LandingArticle header='Jesteśmy open source!'
                                        image={github}
                                        paragraph='Jesteś ciekawy jak aplikacja jest zbudowana?
                                        Chciałbyś zaproponować lub wprowadzić własne zmiany?
                                        Nie ma problemu! WMI Adventure to projekt open source,
                                        który jest otwarty na wszelkie sugestie i rozwój.
                                        Zapraszamy na nasze repozytorium na githubie po więcej informacji.'/>
                    </LandingSection>
                </Main>
                <LandingFooter/>
            </>
        );
    }
}

export default LandingPage;