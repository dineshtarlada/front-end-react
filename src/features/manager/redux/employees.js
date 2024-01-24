import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getEmployees } from "../../../store/actions/employee";
import LeadershipIcon from "../../employee/components/leadershipicon";

function ManagerControlledEmployees(){
    const dispatch=useDispatch();
    let {list}=useSelector((state)=>state.employee)
    useEffect(()=>{
        dispatch(getEmployees())
    },[dispatch])
   
    return(<div>

       <div
       className="card border-secondary mb-3 mr-6"
       style={{
         height: "Auto",
         width: "68rem",
         alignContent: "center",
         justifyContent: "center",
         fontWeight: "bolder",
       }}
     >
       <div
         className="card-header"
         style={{ display: "flex", alignItems: "left", color: "gray" }}
       >
         <LeadershipIcon />
         <h2 style={{ marginLeft: "10px", color: "black" }}>Leader Board</h2>
       </div>

       <div className="card-body">
         <table className="table table-striped">
           <thead>
             <tr>
               <th>
                 <h5>Rank</h5>
               </th>
               <th>
                 <h5>Name</h5>
               </th>
               <th>
                 <h5>Points</h5>
               </th>
             </tr>
           </thead>
           <tbody>
             {list.map((e, index) => (
               <tr key={index}>
                 <td>
                   <h6>{index + 1}</h6>
                 </td>
                 <td>
                   <h6>{e.name}</h6>
                 </td>
                 <td>
                   <h6>{e.pointsBalance}</h6>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
    </div>)
}

export default ManagerControlledEmployees;