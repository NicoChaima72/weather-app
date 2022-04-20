import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonMainWeather = () => {
  return (
    <div className="mt-10">
      <div className="mx-auto">
        <Skeleton
          variant="rectangular"
          width={230}
          height={90}
          style={{ margin: "0 auto" }}
        />
      </div>
      <div className="mt-1">
        <Skeleton
          variant="rectangular"
          width={200}
          height={35}
          style={{ margin: "0 auto" }}
        ></Skeleton>
      </div>
      <div className="">
        <h5 className="text-center font-semibold text-sm mt-3">
          Sabado, Oct 9, 2021
        </h5>
      </div>
      <div className="mt-4">
        <Skeleton
          variant="rectangular"
          width={200}
          height={40}
          style={{ margin: "0 auto" }}
        />
      </div>
    </div>
  );
};

export default SkeletonMainWeather;
