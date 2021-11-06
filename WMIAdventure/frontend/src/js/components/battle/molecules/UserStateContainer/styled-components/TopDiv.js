import styled from 'styled-components';

const TopDiv = styled.div`
  width: 100%;
  height: 42px;
  border-top-left-radius: ${({enemy}) => enemy ? '16px' : '0'};
  border-top-right-radius: ${({enemy}) => enemy ? '16px' : '0'};
  border-bottom-left-radius: ${({user}) => user ? '16px' : '0'};
  border-bottom-right-radius: ${({user}) => user ? '16px' : '0'};
  background-color: ${({theme}) => theme.colors.greenyBluey};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({user}) => user ? '12px' : '0'} 0 ${({enemy}) => enemy ? '12px' : '0'} 0;
`;

export default TopDiv;