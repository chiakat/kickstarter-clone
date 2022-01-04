import React from 'react';
import {
  AppBar, Box, Toolbar, Link, Button,
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

interface NavLink {
  label: string,
  path: string
}

const mainNav = [
  {
    label: 'Manage projects',
    path: '/projects/manage',
  },
  {
    label: 'Create a Project',
    path: '/projects/create',
  },
];

export default function Nav() {
  // const { data: session } = useSession();
  const session = false;

  const renderLogin = () => {
    if (!session) {
      return (
        <Button
          variant="outlined"
          href="/api/auth/signin"
          // onClick={(e) => {
          //   e.preventDefault();
          //   signIn();
          // }}
          sx={{ my: 1, mx: 1.5, color: 'white' }}
        >
          Log in
        </Button>
      );
    }
    return (
      <Button
        variant="outlined"
        href="/api/auth/signout"
          // onClick={(e) => {
          //   e.preventDefault();
          //   signOut();
          // }}
        sx={{ my: 1, mx: 1.5, color: 'white' }}
      >
        Log out
      </Button>
    );
  };

  return (
    <AppBar position="static" elevation={3} sx={{ color: 'white', px: 1 }}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', justifyItems: 'flex-start', flexGrow: 1 }}>
          <Link
            variant="button"
            underline="none"
            href="/"
            sx={{
              my: 1, mx: 1.5, color: 'white', textAlign: 'left', fontSize: 'large',
            }}
          >
            <RocketLaunchIcon sx={{ mr: 2, fontSize: 20 }} />
            Kickstarter
          </Link>
        </Box>
        <nav>
          {mainNav.map((item: NavLink) => (
            <Link
              key={item.label}
              href={item.path}
              variant="button"
              sx={{ my: 1, mx: 1.5, color: 'white' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {renderLogin()}
      </Toolbar>
    </AppBar>
  );
}
