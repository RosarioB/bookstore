import * as React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import CommonLayout from '@/components/Layout';
import ShoppingCartList from '@/components/List/shopping-cart-list';

const Cart: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shopping Cart</title>
        <meta name='description' content='shopping cart' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <CommonLayout
        headerProps={{
          hideMenu: true,
        }}
      >
        <h1 className='font-bold text-5xl'>Shopping Cart</h1>
        <ShoppingCartList />
      </CommonLayout>
    </>
  );
};

export default Cart;