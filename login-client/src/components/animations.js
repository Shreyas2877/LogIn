// src/components/animations.js
import { keyframes } from '@mui/system';
import { styled } from '@mui/material';
import Alert from '@mui/material/Alert';

export const fadeInDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const fadeOutUp = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

export const AnimatedAlert = styled(Alert)`
  animation: ${({ show }) => (show ? fadeInDown : fadeOutUp)} 1s forwards;
  background-color: transparent; /* Remove background */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margin */
  color: inherit; /* Ensure text color is inherited */
  box-shadow: none; /* Remove any box shadow */
`;