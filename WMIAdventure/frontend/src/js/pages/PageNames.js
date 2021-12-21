export const pageNames = {
    '/': 'WMI Adventure',
    '/main': 'Menu główne',
    '/profile': 'Mój profil',
    '/battle': 'Tryb Battle',
    '/cards-creator-start': 'Edytor kart',
    '/cards-creator-edit': 'Tworzenie karty',
    '/cards-creator-create': 'Edycja karty',
    '/login': 'Logowanie',
    '/registration': 'Rejestracja',

}

export const getPagenameByLink = (link) => {
    const translation = pageNames[link];
    if (!translation)
        return link;

    return translation;
}