import React from 'react';
import { CircularProgress } from '@material-ui/core';

function Spinner() {
  return (
    <div
      style={{
        width: '100%',
        marginTop: '24px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress color="secondary" />
    </div>
  );
}

export default Spinner;
