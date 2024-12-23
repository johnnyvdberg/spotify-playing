import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import SecuredApp from './SecuredApp.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className="select-none text-center">
    <React.StrictMode>
      <SecuredApp />
    </React.StrictMode>
  </div>
);
