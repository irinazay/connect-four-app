import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <AppRoutes />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
