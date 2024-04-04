import { Outlet } from "react-router-dom";

function RootPage() {
  return (
    <>
      <nav>네브바</nav>
      <Outlet />
    </>
  );
}

export default RootPage;
