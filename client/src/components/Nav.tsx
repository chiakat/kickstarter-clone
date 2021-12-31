import React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Link,
} from '@mui/material';

interface NavLink {
  label: string,
  path: string
}

const mainNav = [
  {
    label: 'Home',
    path: '/',
  },
];

const rightNav = [
  {
    label: 'Create Project',
    path: '/projects/create',
  },
];

export default function Nav() {
  // const { data: session } = useSession();
  const session = false;

  const renderLogin = () => {
    if (!session) {
      return (
        <Link
          href="/api/auth/signin"
          // onClick={(e) => {
          //   e.preventDefault();
          //   signIn();
          // }}
        >
          Log in
        </Link>
      );
    }
    return (
      <Link
        href="/api/auth/signout"
          // onClick={(e) => {
          //   e.preventDefault();
          //   signOut();
          // }}
      >
        Log out
      </Link>
    );
  };

  return (
    <AppBar position="static" elevation={0} sx={{ background: 'none', color: 'grey', px: 1 }}>
      <Toolbar>
        {mainNav.map((item: NavLink) => (
          <Typography key={item.label} variant="h6" component="div" sx={{ pr: 1, py: 1 }}>
            <Link href={item.path}>
              {item.label}
            </Link>
          </Typography>
        ))}
        <Box sx={{ flexGrow: 3 }} />
        <Box
          component="img"
          src="/logo192.png"
          alt="KickStarter Logo"
          height={50}
          sx={{
            px: 1, py: 1,
          }}
        />
        <Typography variant="h2" color="teal">Kickstarter</Typography>
        {rightNav.map((item: NavLink) => (
          <Typography key={item.label} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href={item.path}>
              {item.label}
            </Link>
          </Typography>
        ))}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {renderLogin()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
