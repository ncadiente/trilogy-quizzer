import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

function LoadingBar(props) {
  return (
    <div>
      <LinearProgress variant="query" />
    </div>
  );
}

export default LoadingBar