'use client';
import { AppProgressBar } from "next-nprogress-bar";
const Providers = ({ children }) => {
  console.log("ProgressBar");
  return (
    <>
      <AppProgressBar
        height="4px"
        color="red"
        options={{ showSpinner: false }}
        shallowRouting={false}
      />
      {children}
    </>
  );
};

export default Providers;
