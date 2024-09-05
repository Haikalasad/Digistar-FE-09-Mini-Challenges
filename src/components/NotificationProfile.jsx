import React from 'react';
import { FaBell } from 'react-icons/fa';
import { Avatar } from '@mui/material';

const NotificationProfile = () => (
  <div className="p-4 bg-white flex justify-between items-center">
 
    <div className="text-gray-600">
      <FaBell size={24} />
    </div>

    <div className="flex items-center">
      <Avatar alt="John Doe" src="/path-to-avatar.jpg" className="mr-2" />
      <span className="font-medium text-gray-800">John Doe</span>
    </div>
  </div>
);

export default NotificationProfile;
