import styled from 'styled-components';

const InfoWrapper = styled.div`
  border-radius: 20px;
  background-color: ${({theme}) => theme.colors.light2};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 10px;
`;

export default InfoWrapper;