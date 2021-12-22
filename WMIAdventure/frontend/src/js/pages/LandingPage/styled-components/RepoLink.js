import styled from 'styled-components';

const RepoLink = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.colors.dark};
  font-weight: ${({theme}) => theme.weight.semibold};
`;

export default RepoLink;