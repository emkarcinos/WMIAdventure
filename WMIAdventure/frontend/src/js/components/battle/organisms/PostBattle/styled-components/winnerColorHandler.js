const winnerColorHandler = (theme, propsWin) => {
    if (propsWin === null) return theme.colors.darkGray;
    if (propsWin) return theme.colors.greenyBluey;
    return theme.colors.red
}
export default winnerColorHandler