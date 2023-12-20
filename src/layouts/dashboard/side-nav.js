import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import EastIcon from '@mui/icons-material/East';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  IconButton,
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
  Fragment,
  Grid
} from '@mui/material';
import { useState } from 'react';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import { fontSize } from '@mui/system';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [collapsedItems, setCollapsedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const handleCollapse = (itemTitle) => {
    console.log(itemTitle);
    if (itemTitle == "Clinician" || itemTitle == "Self Reported" || itemTitle == "3rd Party") {
      setSelectedItem('Medical record');
      return;
    }
    setSelectedItem(itemTitle);
    if (collapsedItems.includes(itemTitle)) {
      setCollapsedItems(collapsedItems.filter((title) => title !== itemTitle));
    } else {
      setCollapsedItems([...collapsedItems, itemTitle]);
    }
  };

  const content = (
    // <Scrollbar
    //   sx={{
    //     height: '100%',
    //     '& .simplebar-content': {
    //       height: '100%'
    //     },
    //     '& .simplebar-scrollbar:before': {
    //       background: 'neutral.400'
    //     },

    //   }}
    // >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'rgba(20, 27, 34, 1)',
        color: 'white',

      }}
    >
      <Box sx={{ p: 3, marginTop: 5, paddingTop: '0px' }}>
        <Stack direction="row"
          alignItems='center'>
          <img style={{ width: '100%', height: '100%' }}
            src="/logo.png" />
        </Stack>
        <p style={{
          color: "rgb(179 182 183)",
          margin: '0 0 0 35px',
          fontSize: '20px',
          fontWeight: "400",
          fontFamily: 'Poppins-Regular',
          textTransform: 'capitalize',
          letterSpacing: 0.20,
          wordWrap: 'break-word'
        }}>My DeMed</p>
      </Box>

      <Box
        component="nav"
        sx={{
          flexGrow: 5,
          px: 2,
          py: 2.8
        }}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: 'none',
            p: 0,
            m: 0
          }}
        >
          {items.map((item) => {
            const active = item.path ? pathname === item.path : false;
            const isCollapsed = collapsedItems.includes(item.title);
            return (
              <>
                <li onClick={() => handleCollapse(item.title)}
                  style={selectedItem === item.title ? { border: "1px solid #607BCC ", borderRadius: 5.75 } : {}}>
                  <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    path={item.path}
                    title={item.title}
                  />
                </li>
                {item.submenu && !isCollapsed && (
                  <ul style={{ listStyleType: 'none', }}>
                    {item.submenu.map((submenuItem) => {
                      const submenuActive = submenuItem.path ? pathname === submenuItem.path : false;

                      return (
                        <li key={submenuItem.title}
                          onClick={() => handleCollapse(submenuItem.title)}>
                          <SideNavItem
                            active={submenuActive}
                            disabled={submenuItem.disabled}
                            external={submenuItem.external}
                            icon={submenuItem.icon}
                            path={submenuItem.path}
                            title={submenuItem.title}
                          />
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            );
          })}
        </Stack>
      </Box>
      <Box
        sx={{
          px: 1.5,
          py: 1,
          background: "rgba(20, 27, 34, 1)"
        }}
      >
        <Typography
          variant="h6"
          sx={{ opacity: '0.7', marginBottom: '20px', letterSpacing: '2.52px', fontFamily: 'Poppins-Regular', mt: -2 }}
        >
          Support
        </Typography>
        <SideNavItem
          // active={submenuActive}
          // disabled={submenuItem.disabled}
          // external={submenuItem.external}
          icon={<SettingsIcon/>}
          path="/settings"
          title="Settings"
        />
      </Box>
      <hr style={{width: '80%'}}></hr>
      <Box sx={{
        px: 8,
        py: 3,
        background: "rgba(20, 27, 34, 1)"
      }}>
        <Button style={{ color: 'white' }}>
          <ArrowForwardIcon />
          <h2 style={{ marginBottom: '0px', marginTop: '0px', marginLeft: '10px', color: 'white' }}>Logout</h2></Button>
      </Box>
      <Stack
        alignItems="center"
        justifyItems="space-between"
        direction="row"
        spacing={2}
        sx={{ marginBottom: '0px', marginLeft: '30px' }}
      >
        <IconButton sx={{ paddingLeft: '5px', width: '40px', height: '40px', background: 'transparent', borderRadius: '50%' }}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="16"
            viewBox="0 0 19 16"
            fill="none">
            <path fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.5091 2.42212C9.80739 3.14133 6.40641 4.62993 1.30615 6.8879C0.477948 7.22256 0.0440986 7.54996 0.00460288 7.87009C-0.0621447 8.41112 0.604615 8.62416 1.51257 8.91427C1.63607 8.95373 1.76404 8.99462 1.89523 9.03795C2.78851 9.33301 3.99014 9.6782 4.61481 9.69191C5.18146 9.70435 5.81389 9.46697 6.51212 8.97978C11.2775 5.71112 13.7373 4.05898 13.8918 4.02337C14.0007 3.99824 14.1517 3.96664 14.254 4.05904C14.3563 4.15143 14.3463 4.32641 14.3354 4.37335C14.2694 4.65948 11.6521 7.132 10.2977 8.41153C9.87542 8.81043 9.5759 9.09338 9.51468 9.15799C9.37752 9.30275 9.23774 9.43968 9.10339 9.57128C8.27351 10.3842 7.65118 10.9938 9.13785 11.9893C9.85227 12.4677 10.424 12.8633 10.9943 13.258C11.6172 13.689 12.2384 14.1189 13.0422 14.6543C13.247 14.7907 13.4426 14.9324 13.6331 15.0704C14.358 15.5955 15.0092 16.0673 15.8138 15.9921C16.2813 15.9484 16.7642 15.5017 17.0094 14.1694C17.589 11.021 18.7283 4.1992 18.9916 1.38811C19.0146 1.14182 18.9856 0.826626 18.9623 0.688261C18.939 0.549896 18.8903 0.352754 18.7133 0.206815C18.5037 0.0339817 18.1801 -0.00246502 18.0354 0.000125586C17.3773 0.0119045 16.3677 0.368619 11.5091 2.42212Z"
              fill="#FFFFFF" />
          </svg>
        </IconButton>
        <IconButton sx={{ paddingLeft: '5px', width: '40px', height: '40px', background: 'transparent', borderRadius: '50%' }}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none">
            <path d="M2.13338 4.26677C3.31162 4.26677 4.26678 3.31162 4.26678 2.13338C4.26678 0.955146 3.31162 0 2.13338 0C0.955146 0 0 0.955146 0 2.13338C0 3.31162 0.955146 4.26677 2.13338 4.26677Z"
              fill="#FFFFFF" />
            <path d="M3.75241 16.3552H0.514399C0.426863 16.3552 0.355164 16.2843 0.355164 16.1959V5.84747C0.355164 5.75993 0.426029 5.68823 0.514399 5.68823H3.75241C3.83994 5.68823 3.91164 5.7591 3.91164 5.84747V16.1959C3.91081 16.2835 3.83994 16.3552 3.75241 16.3552Z"
              fill="#FFFFFF" />
            <path d="M16 9.5999V15.6441C16 16.0351 15.6799 16.3552 15.2889 16.3552H13.1555C12.7645 16.3552 12.4444 16.0351 12.4444 15.6441V10.6662C12.4444 9.68493 11.6482 8.88877 10.667 8.88877C9.68574 8.88877 8.88957 9.68493 8.88957 10.6662V15.6441C8.88957 16.0351 8.56943 16.3552 8.17844 16.3552H6.04505C5.65406 16.3552 5.33392 16.0351 5.33392 15.6441V6.3994C5.33392 6.0084 5.65406 5.68827 6.04505 5.68827H8.17844C8.56943 5.68827 8.88957 6.0084 8.88957 6.3994V6.8546C9.6007 5.93338 10.7779 5.33313 12.0892 5.33313C14.0517 5.33313 16 6.75538 16 9.5999Z"
              fill="#FFFFFF" />
          </svg>
        </IconButton>
        <IconButton sx={{ paddingLeft: '5px', width: '40px', height: '40px', background: 'transparent', borderRadius: '50%' }}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="20"
            viewBox="0 0 11 20"
            fill="none">
            <path d="M10.1843 8.51252L9.93989 10.4753C9.89854 10.8031 9.6209 11.0497 9.29156 11.0497H6.11265V19.2558C5.77741 19.2861 5.43774 19.3016 5.09437 19.3016C4.32641 19.3016 3.57691 19.2248 2.85252 19.0786V11.0497H0.40761C0.18313 11.0497 0 10.8659 0 10.6407V8.18466C0 7.95945 0.18313 7.77558 0.40761 7.77558H2.85252V4.09233C2.85252 1.83202 4.67716 0 6.92861 0H9.78113C10.0056 0 10.1887 0.183865 10.1887 0.409084V2.86507C10.1887 3.09029 10.0056 3.27416 9.78113 3.27416H7.74309C6.84295 3.27416 6.11339 4.00667 6.11339 4.91124V7.77632H9.53672C9.92882 7.77632 10.2323 8.1219 10.1843 8.51252Z"
              fill="#FFFFFF" />
          </svg>
        </IconButton>
        <IconButton sx={{ paddingLeft: '5px', width: '40px', height: '40px', background: 'transparent', borderRadius: '50%' }}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="17"
            viewBox="0 0 19 17"
            fill="none">
            <path d="M11.5363 6.83807L17.9296 0H15.5018L10.4838 5.368L6.64079 0H0L6.72193 9.39001L0 16.5805H2.42785L7.77516 10.8609L11.8696 16.5805H18.5104L11.5363 6.83807ZM3.42142 1.75884H5.73631L15.0881 14.8216H12.7733L3.42142 1.75884Z"
              fill="#FFFFFF" />
          </svg>
        </IconButton>

      </Stack>

    </Box>
    // </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280,
            borderRight: '0px solid'
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280,

        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100, borderRight: '0px solid' }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
