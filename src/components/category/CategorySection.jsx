import React, { useState, useEffect } from 'react';
import { getCategories, createCategories, editCategory, deleteCategory, getWallets } from '../../services/api';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchWallets = async () => {
    try {
      const response = await getWallets();
      setWallets(response.data);
    } catch (error) {
      console.error('Error fetching wallets:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchWallets();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim() || !selectedWallet) return;

    try {
      const newCategory = {
        name: newCategoryName,
        wallet: selectedWallet,
      };
      await createCategories(newCategory);
      setNewCategoryName('');
      setSelectedWallet('');
      setIsAddingCategory(false);
      await fetchCategories();
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  const handleEditCategory = async () => {
    if (!editedCategoryName.trim() || !editingCategory) return;

    try {
      const updatedCategory = { name: editedCategoryName };
      await editCategory(editingCategory._id, updatedCategory);
      setEditingCategory(null);
      setEditedCategoryName('');
      await fetchCategories();
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      await fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 3);

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Categories</h3>
        <button
          onClick={() => setIsAddingCategory(!isAddingCategory)}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          <FaPlus />
        </button>
      </div>

      {isAddingCategory && (
        <div className="space-y-2 mt-2">
          <select
            value={selectedWallet}
            onChange={(e) => setSelectedWallet(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="">Select Wallet</option>
            {wallets.map(wallet => (
              <option key={wallet._id} value={wallet._id}>
                {wallet.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="p-2 border rounded w-full"
          />

          <button
            onClick={handleAddCategory}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Add
          </button>
        </div>
      )}

      {displayedCategories.map(category => (
        <div key={category._id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
          <div>{category.name}</div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setEditingCategory(category);
                setEditedCategoryName(category.name);
              }}
              className="text-blue-500"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDeleteCategory(category._id)}
              className="text-red-500"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      {categories.length > 3 && (
        <button
          onClick={() => setShowAllCategories(!showAllCategories)}
          className="text-blue-500 underline"
        >
          {showAllCategories ? 'See Less' : 'See All'}
        </button>
      )}

      {editingCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Category</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                  type="text"
                  value={editedCategoryName}
                  onChange={(e) => setEditedCategoryName(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditCategory}
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

export default CategorySection;
