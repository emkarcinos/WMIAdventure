export const pageNames = {
    '/': 'Strona startowa',
    '/main': 'Menu główne',
    '/profile': 'Twój profil',
    '/battle': 'Tryb Battle',
    '/cards-creator-start': 'Kreator kart',
    '/cards-creator-edit': 'Kreator kart',
    '/cards-creator-create': 'Kreator kart',
    '/login': 'Logowanie',
    '/registration': 'Rejestracja',

}

export const getPagenameByLink = (link) => {
    const translation = pageNames[link];
    if (!translation)
        return link;

    return translation;
}