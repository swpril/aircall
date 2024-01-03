import { Button as MuiButton } from '@mui/material';

export const Button = ({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => (
  <MuiButton
    onClick={onClick}
    sx={{
      textTransform: 'none',
      color: 'black',
      cursor: 'pointer'
    }}>
    {children}
  </MuiButton>
);
