import React from "react";

const MarketingDetail = ({ crops }) => {
  return (
    <>
    <span>Marketing Page</span>
      {crops.crops?.map((crop, index) => (
        <div className="rounded-1xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
          <a className="block rounded-xl bg-white p-2 sm:p-4" href="">
            <div className="mt-16 sm:pr-4">
              <h5 className="text-xl font-bold text-gray-900">
           jj
              </h5>

              <p className="mt-2 text-sm text-gray-500">
                {crop?.cropType.name}
              </p>
            </div>
          </a>
        </div>
      ))}
    </>
  );
};

export default MarketingDetail;
