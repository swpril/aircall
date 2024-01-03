import {
  Call,
  Dialpad,
  Person,
  RadioButtonChecked,
  Settings
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';

const BOTTOM_NAV = [
  { label: 'Call', icon: Call },
  { label: 'Profile', icon: Person },
  { label: 'DialPad', icon: Dialpad },
  { label: 'Settings', icon: Settings },
  { label: 'Recordings', icon: RadioButtonChecked }
];

export const BottomNav = () => {
  return (
    <Box sx={{ width: 400 }}>
      <BottomNavigation>
        {BOTTOM_NAV.map(item => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={
              <item.icon
                {...(item.label === 'DialPad' && { color: 'success' })}
              />
            }
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};
