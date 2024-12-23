import React from 'react';

interface StatusProps {
  message: string;
}

const Status: React.FC<StatusProps> = ({ message }) => (
  <div className="text-control">
    <h1>{message}</h1>
  </div>
);

export default Status;
