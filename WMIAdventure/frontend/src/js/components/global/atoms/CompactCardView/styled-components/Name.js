import styled from 'styled-components';

const fontSteps = {
    mini: 7,
    normal: 9,
    long: 14,
    longer: 18,
    extraLong: 24,
}

function nameLengthHandler(nameLength, ownFontSize) {
    if (ownFontSize)
        return ownFontSize;
    if (nameLength < fontSteps.mini)
        return '20px';
    if (nameLength < fontSteps.normal)
        return '18px';
    if (nameLength < fontSteps.long)
        return '16px';
    if (nameLength < fontSteps.longer)
        return '14px';
    return '12px';
}

const Name = styled.p`
  margin: 0;
  font-size: ${({nameLength, ownFontSize}) => nameLengthHandler(nameLength, ownFontSize)};
  text-align: center;
  text-transform: uppercase;
  font-weight: ${({theme}) => theme.weight.semibold};
  color: ${({theme}) => theme.colors.dark};
  overflow-wrap: anywhere;
  max-width: 120px;
`;

export default Name;