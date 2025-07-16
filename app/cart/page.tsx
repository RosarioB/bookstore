import * as React from 'react';
import { Metadata } from 'next';
import CommonLayout from '@/components/Layout';
import ShoppingCartList from '@/components/List/shopping-cart-list';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'View and manage items in your shopping cart',
};

export default function Cart() {
  return (
    <CommonLayout
      headerProps={{
        hideMenu: true,
      }}
    >
      <h1 className='font-bold text-5xl'>Shopping Cart</h1>
      <ShoppingCartList />
    </CommonLayout>
  );
}