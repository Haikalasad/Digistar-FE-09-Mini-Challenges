import React, { useState, useEffect } from 'react';
import AddExpenseForm from './AddExpenseForm';
import { getWallets, getCategories } from '../../services/api'; 

const AddExpenseModal = ({ isOpen, onClose, onAddExpense, currentWalletId }) => {
  const [wallets, setWallets] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchWalletsAndCategories = async () => {
      try {
        const walletResponse = await getWallets();
        setWallets(walletResponse.data);

        const categoryResponse = await getCategories();
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error('Failed to fetch wallets or categories:', error);
      }
    };

    fetchWalletsAndCategories();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Add New Expense</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>
        <div className="p-4">
          <AddExpenseForm
            onAddExpense={onAddExpense}
            wallets={wallets}
            categories={categories}
            currentWalletId={currentWalletId} 
          />
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;
