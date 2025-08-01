import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@components/Loading";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center bg-dark-200">
      <div className="h-fit w-[450px] bg-white px-8 py-10">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
export default AuthLayout;
