// 정주현

import "./Header.css";
import Header from "./Header";
import Network from "../Network/Network";

function Layout() {
  return (
    <>
      <Header /> {/* Header 태그는 항상 맨 아래에 위치해야함. */}
      <div className='blank-top'>
        {/* blank-top div는 항상 맨 위에 위치해야함. */}
      </div>
      <Network />
    </>
  );
}

export default Layout;
