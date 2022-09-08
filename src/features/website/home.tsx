import React from "react";
import ContentPage from "./content";
import HeaderPage from "./header";

const HomePage = ({message = ''}) => {
  return (
    <div>
     <HeaderPage/>
     <ContentPage/>
     </div>
  );
};

export default HomePage;