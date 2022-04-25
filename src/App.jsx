import React from "react";
import AppRouter from "./routers/AppRouter";
import "./App.css";

import "moment/dist/locale/es";

const App = () => {
  return (
    <div>
      <AppRouter></AppRouter>
    </div>
  );
};

export default App;
