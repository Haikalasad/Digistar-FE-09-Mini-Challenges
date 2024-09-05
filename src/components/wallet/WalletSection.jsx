import React, { useState, useEffect } from 'react';
import { getWallets, createWallet, editWallet, deleteWallet } from '../../services/api';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const WalletSection = ({ onSelectWallet }) => {
  const [wallets, setWallets] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isAddingWallet, setIsAddingWallet] = useState(false);
  const [newWalletName, setNewWalletName] = useState('');
  const [editingWallet, setEditingWallet] = useState(null);
  const [editedWalletName, setEditedWalletName] = useState('');

  const fetchWallets = async () => {
    try {
      const response = await getWallets();
      setWallets(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch wallets:', error);
      setWallets([]);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const displayedWallets = showAll ? wallets : wallets.slice(0, 3);

  const handleAddWallet = async () => {
    if (!newWalletName.trim()) return;

    try {
      const newWallet = { name: newWalletName };
      const response = await createWallet(newWallet);
      setWallets([...wallets, response.data]);
      setNewWalletName('');
      setIsAddingWallet(false);
      await fetchWallets();
    } catch (error) {
      console.error('Failed to add wallet:', error);
    }
  };

  const handleEditWallet = async () => {
    if (!editedWalletName.trim() || !editingWallet) return;

    try {
      const updatedWallet = { name: editedWalletName };
      const response = await editWallet(editingWallet._id, updatedWallet);
      setWallets(wallets.map(wallet => (wallet._id === editingWallet._id ? response.data : wallet)));
      setEditingWallet(null);
      setEditedWalletName('');
    } catch (error) {
      console.error('Failed to update wallet:', error);
    }
  };

  const handleDeleteWallet = async (walletId) => {
    try {
      await deleteWallet(walletId);
      setWallets(wallets.filter(wallet => wallet._id !== walletId));
    } catch (error) {
      console.error('Failed to delete wallet:', error);
    }
  };

  const handleClickWallet = (wallet) => {
    if (!editingWallet) {
      onSelectWallet(wallet);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Wallets</h3>
        <button
          onClick={() => setIsAddingWallet(!isAddingWallet)}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          <FaPlus />
        </button>
      </div>

      {isAddingWallet && (
        <div className="flex space-x-2 mt-2">
          <input
            type="text"
            value={newWalletName}
            onChange={(e) => setNewWalletName(e.target.value)}
            placeholder="Enter wallet name"
            className="p-2 border rounded w-full"
          />
          <button
            onClick={handleAddWallet}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      )}

      {displayedWallets.map(wallet => (
        <div
          key={wallet._id}
          className="flex justify-between items-center bg-gray-100 p-4 rounded mb-2 cursor-pointer"
          onClick={() => handleClickWallet(wallet)}
        >
          <div className="flex-1">{wallet.name}</div>
          <div className="flex items-center space-x-2">
            <div>
              {wallet.expenseItems.reduce((total, item) => total + item.amount, 0).toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingWallet(wallet);
                setEditedWalletName(wallet.name);
              }}
              className="text-blue-500"
            >
              <FaEdit />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteWallet(wallet._id);
              }}
              className="text-red-500"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      {wallets.length > 3 && (
        <div
          className="m-2 text-blue-500 cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'See All'}
        </div>
      )}

      {editingWallet && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Wallet</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Wallet Name</label>
                <input
                  type="text"
                  value={editedWalletName}
                  onChange={(e) => setEditedWalletName(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditingWallet(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditWallet}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletSection;
