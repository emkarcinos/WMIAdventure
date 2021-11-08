import styled from 'styled-components';

const NickDiv = styled.div`
  width: 100%;
  height: 42px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${({theme}) => theme.colors.greenyBluey};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 12px 0;
`;

export default NickDiv;