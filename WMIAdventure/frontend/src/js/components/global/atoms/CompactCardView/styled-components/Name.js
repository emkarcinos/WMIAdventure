import styled from 'styled-components';

const fontSteps = {
    normal: 7,
    long: 14,
    longer: 18,
    extraLong: 24,
}

function nameLengthHandler(nameLength, ownFontSize) {
    if (ownFontSize && nameLength < fontSteps.normal)
        return ownFontSize;
    if (nameLength < fontSteps.normal)
        return '20px';
    if (ownFontSize && nameLength < fontSteps.long)
        return '18px';
    if (nameLength < fontSteps.longer)
        return '16px';
    return '14px';
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