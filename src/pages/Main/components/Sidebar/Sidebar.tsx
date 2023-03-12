import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { workspace, teamBoard, personalBoard, setting, logout } from '@constants/icon-link';
import { logoutUser } from '@auth/store/user-slice';
import { useDispatch } from 'react-redux';
import { SidebarLinks } from './SidebarLinks';

export const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <Box bg="rgba(217, 223, 246, 0.36)" w="17%">
      <Center>
        <Box bg="white" w="75%" marginTop="2rem">
          <DayPicker />
        </Box>
      </Center>
      <SidebarLinks linkPath="/workspace" image={workspace} linkText="Workspace" />
      <SidebarLinks linkPath="/team" image={teamBoard} linkText="Team Board" />
      <SidebarLinks linkPath="/personal" image={personalBoard} linkText="Personal Board" />
      <SidebarLinks linkPath="#" image={setting} linkText="Setting" />
      <SidebarLinks
        linkPath="/login"
        logoutUser={() => dispatch(logoutUser())}
        image={logout}
        linkText="Log Out"
      />
    </Box>
  );
};
