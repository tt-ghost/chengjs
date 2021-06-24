import React from 'react';
import logo from './logo.svg';
import { Button, DatePicker } from '@alifd/next';
import './index.scss';

export default function App() {
  return ( 
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        , <DatePicker /> <Button>按钮</Button>
      </header>
    </div>
  );
};
