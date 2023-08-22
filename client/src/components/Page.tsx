import React from "react";
import Colors from "../consts/Colors";

const Page: React.FC<any> = ({ children }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: Colors.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};
export default Page;
