import React from 'react';

import { useLocation } from 'react-router-dom';

function Error() {
  const location = useLocation();

  return (
    !(/\/(anmeldung|registrierung)/.test(location.pathname)) ?
      <div>
        Error
      </div>
    : null
  );
}

export default Error;
