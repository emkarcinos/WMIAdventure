import styled from 'styled-components';

function nameLengthHandler(nameLength, ownFontSize) {
    if (ownFontSize && nameLength < 20)
        return ownFontSize;
    if (nameLength < 20)
        return '20px';
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