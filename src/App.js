import "./App.css";
import UserListing from "./views/UserListing";
import { StyleProvider } from "@ant-design/cssinjs";

function App() {
  return (
    <div className="appnox-test">
      <StyleProvider hashPriority="high">
        <UserListing />
      </StyleProvider>
    </div>
  );
}

export default App;
