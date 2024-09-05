import React, { useState, useEffect } from 'react';
import { getExpensesByWalletId,deleteExpenseItem } from '../../services/api'; // Perbaiki import jika diperlukan
import ExpenseList from './ExpenseList';
import AddExpenseModal from './AddExpenseModal';
import FilterList from '../FilterList';

const ExpenseManager = ({ walletId }) => {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchExpensesAndCategories = async () => {
            try {
                if (walletId) {
                    const expenseResponse = await getExpensesByWalletId(walletId);
                    const expenseData = expenseResponse.data;
                    setExpenses(expenseData.expenseItems || []);
                    
                    const categoryArray = await fetchCategories();
                    console.log('Fetched Categories:', categoryArray);
                    
                    const categoryMap = categoryArray.reduce((acc, category) => {
                        if (category._id && category.name) {
                            acc[category._id] = category.name;
                        } else {
                            throw new Error('Invalid category format in data');
                        }
                        return acc;
                    }, {});
                    console.log('Category Map:', categoryMap);
                    setCategories(categoryMap);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchExpensesAndCategories();
    }, [walletId]);

    const handleAddExpense = (newExpense) => {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        setIsModalOpen(false);
    };
    const handleDeleteExpense = async (id) => {
      try {
          await deleteExpenseItem(id);
          setExpenses(prevExpenses => prevExpenses.filter(expense => expense._id !== id));
      } catch (error) {
          console.error('Failed to delete expense:', error);
      }
  };

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://digistar-demo-be.vercel.app/api/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            if (!data || !data.data || !Array.isArray(data.data)) {
                throw new Error('Invalid category data format');
            }
            return data.data; 
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            throw error;
        }
    };

    const mappedExpenses = expenses.map(expense => ({
        ...expense,
        categoryName: categories[expense.category] || `Unknown Category - ${expense.category}`,
    }));

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center mb-4">
                <FilterList />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    Add Expense
                </button>
            </div>

               <AddExpenseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddExpense={handleAddExpense}
                currentWalletId={walletId}
            />

<ExpenseList expenses={mappedExpenses} setExpenses={setExpenses} />
        </div>
    );
};

export default ExpenseManager;
