import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonStatsWeather = () => {
  return (
    <div className="mt-16 p-6 sm:p-8 md:p-10 xl:p-14 rounded-lg bg-gray-50 shadow">
      <section className="mt-2">
        <h3 className="text-xl font-medium text-gray-700">Horas</h3>
        <div className="pb-2 mt-1">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={90}
            style={{ margin: "0 auto" }}
          />
        </div>
      </section>
      <section className="bg-white mt-6 shadow-sm border border-gray-100 rounded-lg text-gray-500 p-3">
        <p>Estadisticas</p>
        <div className="grid grid-cols-2 gap-2 pt-3">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={60}
            style={{ margin: "0 auto" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={60}
            style={{ margin: "0 auto" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={60}
            style={{ margin: "0 auto" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={60}
            style={{ margin: "0 auto" }}
          />
        </div>
      </section>
      <section className="mt-10 mb-10">
        <h3 className="text-xl font-medium text-gray-700">Dias</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 mt-1">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={70}
            style={{ margin: "0 auto" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={70}
            style={{ margin: "0 auto" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={70}
            style={{ margin: "0 auto" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={70}
            style={{ margin: "0 auto" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={70}
            style={{ margin: "0 auto" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={70}
            style={{ margin: "0 auto" }}
          />
        </div>
      </section>
    </div>
  );
};

export default SkeletonStatsWeather;
