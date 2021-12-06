import styled from 'styled-components';

const LeftProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 356px;
  height: 100%;
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  padding: 110px 0 60px;
`;

export default LeftProfileContainer;