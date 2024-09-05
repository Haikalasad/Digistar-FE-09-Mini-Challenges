import React from 'react';

const HomeWallet = ({ wallet }) => (
  <div className="p-4 bg-blue-600 rounded-md font-semibold text-white">
    {wallet ? `Wallet: ${wallet.name}` : 'Home Wallet'}
  </div>
);

const CalendarInput = () => (
  <input type="date" className="p-2 rounded border"/>
);

const HomeWalletCalendar = ({ wallet }) => (
  <div className="flex justify-between items-center p-4">
    <HomeWallet wallet={wallet} />
    <CalendarInput />
  </div>
);

export default HomeWalletCalendar;
