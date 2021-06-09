import styled from 'styled-components';

const Paragraph = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.colors.ui07};
  margin: ${({last}) => last ? '0' : '0 0 10px 0'};
  border-bottom: ${({border}) => border ? `1px solid ${({theme}) => theme.colors.ui07}` : 'none'};
  padding: ${({border}) => border ? '0 0 10px 0' : '0'};
  display: block;
  text-align: center;
  font-size: 16px;
`;

export default Paragraph;