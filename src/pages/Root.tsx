import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { Product } from '../interfaces/Product';
import { Button, Menu, MenuItem, Select, Typography } from '@mui/material';
import AddProductForm from '../components/AddProductForm';
import useAppDispatch from '../hooks/useAppDispatch';
import { fetchAllProducts } from '../store/reducers/productReducer';
import useAppSelector from '../hooks/useAppSelector';
import SortConditionPicker from '../components/SortConditionPicker';

const Root = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState(false);
  const handleOpenCreateProductModal = () => {
    setIsCreateProductModalOpen(true);
  };
  const handleCloseCreateProductModal = () => {
    setIsCreateProductModalOpen(false);
  };

  const handleProductCreated = () => {
    dispatch(fetchAllProducts());
  };

  return (
    <>
      <Header />
      <div className='product-main'>
        <SideMenu />
        <div>
          <div id='product-main__btn-group'>
            <SortConditionPicker />
            {isLoggedIn && (
              <Button
                id='product-main__btn-group__btn-add-product'
                variant='contained'
                color='secondary'
                onClick={handleOpenCreateProductModal}
              >
                Add Product
              </Button>
            )}
          </div>
          <AddProductForm
            open={isCreateProductModalOpen}
            onClose={handleCloseCreateProductModal}
            onProductCreated={handleProductCreated}
          />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;