import React from "react";
import { Skeleton } from "@mui/material";

const LoadingSkeleton = () => {
  return (
    <>
      <div className="flex gap-10">
        <Skeleton variant="rectangular" width={300} height={200} />
        <div className="flex flex-col gap-10">
          <Skeleton variant="text" width={700} />
          <Skeleton variant="text" width={700} height={100} />
        </div>
      </div>
    </>
  );
};

export default LoadingSkeleton;
