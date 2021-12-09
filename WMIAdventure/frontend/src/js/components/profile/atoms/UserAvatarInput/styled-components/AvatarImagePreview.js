import styled from 'styled-components'

const AvatarImagePreview = styled.img`
  /* Size */
  width: 138px;
  height: 138px;

  /* Styling */
  border-radius: 4px;
  background-color: ${({theme}) => theme.colors.light2};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);

  object-fit: contain;
`;

export default AvatarImagePreview;