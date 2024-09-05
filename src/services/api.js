import axios from 'axios';

const BASE_URL = 'https://digistar-demo-be.vercel.app/api';

//  CRUD EXPENSE-LIST START

export const getExpenseItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/expense-items`);
    return response.data;
  } catch (error) {
    console.error('Error fetching expense items:', error);
    throw error;
  }
};

export const createExpenseItem = async (expense) => {
  try {
    const response = await axios.post(`${BASE_URL}/expense-items`, expense);
    return response.data;
  } catch (error) {
    console.error('Error creating expense item:', error);
    throw error;
  }
};

export const deleteExpenseItem = async (expenseId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/expense-items/${expenseId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting expense item:', error);
    throw error;
  }
};

export const editExpenseItem = async (expenseId, updatedExpense) => {
  try {
    const response = await axios.put(`${BASE_URL}/expense-items/${expenseId}`, updatedExpense);
    return response.data;
  } catch (error) {
    console.error('Error updating expense item:', error);
    throw error;
  }
};



//  CRUD EXPENSE-LIST END



//  CRUD WALLET START

export const getWallets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/wallets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wallets:', error);
    throw error;
  }
};

export const getExpensesByWalletId = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/wallets/${id}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching expenses by wallet ID:', error);
      throw error;
    }
  };


export const createWallet = async (walletData) => {
  try{
    const response = await axios.post(`${BASE_URL}/wallets`,walletData);
    return response.data;
  }
  catch(error){
    console.error('Error creating expense item:', error);
    throw error;
  }
}

export const editWallet = async (walletId, updatedWallet) => {
  try {
    const response = await axios.put(`${BASE_URL}/wallets/${walletId}`, updatedWallet);
    return response.data;
  } catch (error) {
    console.error('Error updating wallet:', error);
    throw error;
  }
};

export const deleteWallet = async (walletsId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/wallets/${walletsId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting expense item:', error);
    throw error;
  }
};


//  CRUD WALLET END




//  CRUD CATEGORIES START
export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};


export const createCategories = async (categoryData) => {
  try{
    const response = await axios.post(`${BASE_URL}/categories`,categoryData);
    return response.data;
  }
  catch(error){
    console.error('Error creating expense item:', error);
    throw error;
  }
}


export const editCategory = async (categoryId, updatedCategory) => {
  try {
    const response = await axios.put(`${BASE_URL}/categories/${categoryId}`, updatedCategory);
    return response.data;
  } catch (error) {
    console.error('Error updating wallet:', error);
    throw error;
  }
};



export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting expense item:', error);
    throw error;
  }
};


//  CRUD CATEGORIES END