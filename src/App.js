import React from "react";
import Router from "./routes";

function App() {
  return (
    <div className="min-h-screen font-main">
      {/* {isShowModal && <Modal>{modalChidren}<Modal/>} */}
      <Router />
    </div>
  );
}

export default App;
