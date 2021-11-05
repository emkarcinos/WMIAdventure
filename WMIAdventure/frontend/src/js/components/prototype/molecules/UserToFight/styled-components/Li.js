import styled from 'styled-components';

const Li = styled.li`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  border-radius: 10px;
  margin-bottom: 16px;
  border: 2px solid ${({theme}) => theme.colors.yellowyOrangy};
`;

export default Li;