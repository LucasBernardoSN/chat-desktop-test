import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { keyframes, styled } from '../stitches.config';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const AlertDialog = styled(AlertDialogPrimitive.Root, {
  zIndex: '$alwaysOnTop',
  position: 'fixed',
});

export const AlertDialogTrigger = styled(AlertDialogPrimitive.Trigger, {
  zIndex: '$alwaysOnTop',
  display: 'none',
});

export const AlertPortal = styled(AlertDialogPrimitive.Portal, {
  zIndex: '$alwaysOnTop',
});

export const Overlay = styled(AlertDialogPrimitive.Overlay, {
  zIndex: '$alwaysOnTop',

  backgroundColor: '#000000cc',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

export const Flex = styled('div', {
  zIndex: '$alwaysOnTop',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'red',
});

export const AlertContent = styled(AlertDialogPrimitive.Content, {
  zIndex: '$alwaysOnTop',
  width: '90vw',
  position: 'fixed',
  padding: '$20',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '400px',
  backgroundColor: '$main',
  borderRadius: '$normal',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',

  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  '&:focus': { outline: 'none' },
});

export const AlertDialogDescription = styled(AlertDialogPrimitive.Description, {
  zIndex: '$alwaysOnTop',
  marginBottom: '$20',
  color: '$text_high_constrast',
});

export const AlertDialogCancel = AlertDialogPrimitive.Cancel;
export const AlertDialogAction = AlertDialogPrimitive.Action;

export const AlertButton = styled('button', {
  zIndex: '$alwaysOnTop',
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$small',
  cursor: 'pointer',
  paddingX: '$20',
  paddingY: '$10',

  variants: {
    color: {
      primary: {
        color: 'white',

        backgroundColor: '$tomato_solid_background',

        '&:hover': {
          backgroundColor: '$tomato_solid_focused',
        },
      },

      cancel: {
        color: 'white',

        backgroundColor: '$solid_background',

        '&:hover': {
          backgroundColor: '$solid_focused',
        },
      },
    },
  },
});
