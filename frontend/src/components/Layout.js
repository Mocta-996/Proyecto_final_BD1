import React from 'react';

import Navbar from './Navbar';

function Layout(props) {
    return (
    <React.Fragment>
      <Navbar logg={props.logg} islog={props.islog}/>
      {props.children}
    </React.Fragment>
  );
}

export default Layout;