import React, { useState } from 'react';
import { deleteExpenseItem, editExpenseItem } from '../../services/api'; 
import EditExpenseModal from './EditExpenseModal';

const ExpenseList = ({ expenses, setExpenses }) => { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null); 

  if (!Array.isArray(expenses)) {
    return <div>Error: Expected expenses to be an array.</div>;
  }

  if (expenses.length === 0) {
    return (
      <div className="p-4 bg-gray-100 text-center text-gray-500">
        List expenses kosong
      </div>
    );
  }

  const handleDelete = async (expenseId) => {
    try {
      await deleteExpenseItem(expenseId); 
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== expenseId));
    } catch (error) {
      console.error('Failed to delete expense item:', error);
    }
  };

  const handleEditClick = (expense) => {
    console.log(expense)
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleUpdateExpense = async (updatedExpense) => {
    try {
      const updated = await editExpenseItem(updatedExpense._id, updatedExpense);
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) => (expense._id === updatedExpense._id ? updatedExpense : expense))
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to update expense item:', error);
    }
  };

  return (
    <div className="space-y-4">
      {expenses.map((expense) => {
        const {
          _id,
          title,
          amount,
          categoryName,
          flowType,
          createdAt
        } = expense;

        return (
          <div key={_id} className="flex justify-between items-center bg-white p-4 rounded shadow">
            <div className="flex space-x-4 items-center">
              <div className={`p-2 rounded-full ${flowType === 'outcome' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>
                {flowType === 'outcome' ? '-' : '+'}
              </div>
              <div>
                <div className="font-bold text-lg">{title}</div>
                <div className="text-sm text-gray-500">{`${categoryName}`}</div>
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              <div>{new Date(createdAt).toLocaleDateString()}</div>
              <div className="text-gray-700">{`Rp${amount.toLocaleString('id-ID')}`}</div>
              <button
                onClick={() => handleEditClick(expense)} 
                className="text-green-500 hover:text-green-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(_id)} 
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

    
{isModalOpen && (
  <EditExpenseModal
    expense={selectedExpense}
    onClose={() => {
      console.log('Closing modal');  
      setIsModalOpen(false);
    }}
    onUpdate={handleUpdateExpense} 
  />
)}

    </div>
  );
};

export default ExpenseList;
