import React, { useState, useEffect } from 'react';

const AddExpenseForm = ({ currentWalletId }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [wallet, setWallet] = useState('');
    const [category, setCategory] = useState('');
    const [flowType, setFlowType] = useState('outcome');
    const [wallets, setWallets] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (currentWalletId) {
            setWallet(currentWalletId);
        }
    }, [currentWalletId]);

    const fetchWallets = async () => {
        try {
            const response = await fetch('https://digistar-demo-be.vercel.app/api/wallets');
            const data = await response.json();
            setWallets(data.data || []);
        } catch (error) {
            console.error('Failed to fetch wallets:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://digistar-demo-be.vercel.app/api/categories');
            const data = await response.json();
            setCategories(data.data || []);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    useEffect(() => {
        fetchWallets();
        fetchCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !amount || !wallet || !category) {
            alert('All fields are required!');
            return;
        }

        try {
            const response = await fetch('https://digistar-demo-be.vercel.app/api/expense-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    amount: parseFloat(amount),
                    wallet,
                    category,
                    flowType,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Expense added:', result);
            setTitle('');
            setAmount('');
            setWallet('');
            setCategory('');
            setFlowType('outcome');
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-2 bg-white rounded-md">
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="wallet" className="block text-sm font-medium text-gray-700">Wallet</label>
                <select
                    id="wallet"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Select Wallet</option>
                    {wallets.map((w) => (
                        <option key={w._id} value={w._id}>
                            {w.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <span className="block text-sm font-medium text-gray-700">Flow Type</span>
                <div className="flex items-center space-x-4 mt-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="outcome"
                            checked={flowType === 'outcome'}
                            onChange={(e) => setFlowType(e.target.value)}
                            className="mr-2"
                        />
                        <span>Outcome</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="income"
                            checked={flowType === 'income'}
                            onChange={(e) => setFlowType(e.target.value)}
                            className="mr-2"
                        />
                        <span>Income</span>
                    </label>
                </div>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Add Expense
            </button>
        </form>
    );
};

export default AddExpenseForm;
