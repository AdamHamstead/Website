import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BlockCodeHandler = () => {
  const [isSplit, setIsSplit] = useState(false);

  const toggleSplit = () => {
    setIsSplit(!isSplit);
  };

  return (
    <div className="position-relative vh-100">
      <button
        className="btn btn-primary position-absolute top-0 end-0 m-3"
        onClick={toggleSplit}
      >
        {isSplit ? 'Close Split' : 'Split Page'}
      </button>

      {isSplit ? (
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-6 bg-dark text-white d-flex align-items-center justify-content-center">
              Left Panel
            </div>
            <div className="col-6 bg-secondary text-white d-flex align-items-center justify-content-center">
              Right Panel
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex h-100 align-items-center justify-content-center bg-light">
          <h2 className="text-dark">Full Page View</h2>
        </div>
      )}
    </div>
  );
};

export default BlockCodeHandler;
