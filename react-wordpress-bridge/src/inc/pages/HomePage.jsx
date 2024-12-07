import React from 'react';
import GlobalComp from '../global/globalComponent';

function Home({pageName}) {
  return (
    <>
      <GlobalComp PageName={pageName}/>
    </>
  );
}

export default Home;
