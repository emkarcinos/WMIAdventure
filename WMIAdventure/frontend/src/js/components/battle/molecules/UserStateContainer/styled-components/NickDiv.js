import styled from 'styled-components';

const NickDiv = styled.div`
  width: 100%;
  height: 42px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  background-color: ${({theme}) => theme.colors.greenyBluey};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0 0 0;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    border-radius: 16px 16px 0 0;
    margin: 0;
  }
`;

export default NickDiv;