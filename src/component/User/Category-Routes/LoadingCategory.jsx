import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export const LoadingCategory=()=> {
  return (
    <div className="container">
      <div className="row">
        {Array.from(new Array(12)).map((item, index) => (
          <Box
            className="col-2"
            key={index}
            sx={{ width: 210, marginRight: 0.5, my: 5 }}
          >
            <Skeleton variant="rectangular" width={210} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        ))}
      </div>
    </div>
  );
}


