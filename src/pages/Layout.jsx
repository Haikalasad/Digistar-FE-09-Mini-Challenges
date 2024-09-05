import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HomeWalletCalendar from '../components/HomeWallet';
import ExpenseManager from '../components/expense/ExpenseManager';
import NotificationProfile from '../components/NotificationProfile';
import WalletSection from '../components/wallet/WalletSection';
import CategorySection from '../components/category/CategorySection';

const Layout = () => {
    const [selectedWallet, setSelectedWallet] = useState(null);

    const handleSelectWallet = (wallet) => {
      setSelectedWallet(wallet);
    };

  return (
    <div className="flex h-screen">
       <div className="w-3/4 bg-gray-50 flex flex-col">
        <Navbar />
        <div className="p-4 flex-grow">
          <HomeWalletCalendar wallet={selectedWallet} />
          <ExpenseManager walletId={selectedWallet?._id} />
        </div>
      </div>
      <div className="w-1/4 bg-gray-100 p-4 space-y-4">
        <NotificationProfile />
        <WalletSection onSelectWallet={handleSelectWallet} />
        <CategorySection />
      </div>
    </div>
  );
};

export default Layout;
