import { useSearchParams } from "react-router-dom";
import LeaderBoard from "./components/leaderboard";
import MySidebar from "./components/sidebar";

import MainDashboard from "./components/maindashboard";
import HistoryComponent from "./components/history";
import TransferComponent from "./components/transfer";
import ProductComponent from "./components/products";
import CartComponent from "./components/cart";
import { useState } from "react";
import EmployeeProfile from "./components/profile";

function EmployeeDashboard() {
  const [param] = useSearchParams();
  const [qStr, setQstr] = useState("");

  const searchProducts = (str) => {
    console.log("seach func in parent comp called....." + str);
    setQstr(str);
  };

  const process = () => {
    if (!param.get("page")) {
      return (
        <div>
          <MainDashboard />
        </div>
      );
    }
    if (param.get("page") === "dashboard") {
      return (
        <div>
          <MainDashboard />
        </div>
      );
    }
    if (param.get("page") === "products") {
      return (
        <div>
          <ProductComponent func={searchProducts} strVal={qStr} />
        </div>
      );
    }
    if (param.get("page") === "transfer") {
      return (
        <div>
          <TransferComponent />
        </div>
      );
    }
    if (param.get("page") === "history") {
      return (
        <div>
          <HistoryComponent />
        </div>
      );
    }
    if (param.get("page") === "cart") {
      return (
        <div>
          <CartComponent />
        </div>
      );
    }
    if (param.get("page") === "leaderboard") {
      return (
        <div className="col-md-3 ">
          <LeaderBoard />
        </div>
      );
    }
    if (param.get("page") === "profile") {
      return (
        <div>
          <EmployeeProfile />
        </div>
      );
    }
  };

  return (
    <div
      className="row"
      /*style={{
   
      backgroundImage:`url(${img})`,
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat',
  
     
     



    }}*/
    >
      <br />
      <div className="col-md-3">
        <MySidebar />
      </div>

      <div className="col-md-6">{process()}</div>
    </div>
  );
}
export default EmployeeDashboard;
