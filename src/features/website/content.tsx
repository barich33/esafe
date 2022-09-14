import React from "react";
import AboutUs from "./pages/about_us";

const ContentPage = ({message = ''}) => {
  return (
    <div className="max-w-xl mx-auto text-center">
  <h2 className="text-2xl font-bold sm:text-3xl">About Us</h2>

    <span
      className="rounded-full"
    >
      <AboutUs/>
    </span>

</div>

  );
};

export default ContentPage;