import React from 'react';
import {Outlet} from 'react-router-dom';

import Middle from './Middle';
import Navbar from './Navbar';

function Frame() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Middle>
        <Outlet />
      </Middle>
    </div>
  );
}

export default Frame;
