import React from "react";
import { useNavigate } from 'react-router-dom';

const withRouter = WrappedComponent => props => {
  const navigate = useNavigate();
  
  return (
    <WrappedComponent
      {...props}
      {...{ navigate, /* other hooks */ }}
    />
  );
};

export default withRouter;