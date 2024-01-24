import { useSearchParams } from "react-router-dom"
import AppreciationComponent from "./components/Appreciations"
import ManagerHistoryComponent from "./components/history"
import ManagerLeaderBoard from "./components/managerleaderboard"
import ManagerSideBar from "./components/managersidebar"

function ManagerDashboard(){
    const [param]=useSearchParams()
    const process = ()=>{
        if(!param.get('page')){
          return  <div>
              
          <AppreciationComponent/>
           
          
       </div>
      }
        if(param.get('page')==='appreciations'){
            return  <div>
              
           <AppreciationComponent/>
            
           
        </div>
        }
       
       
        if(param.get('page') === 'history'){
          return <div>
             <ManagerHistoryComponent/>
          </div>
        }
        
          if(param.get('page') === 'leaderboard'){
            return <div className="col-md-3 ">
            <ManagerLeaderBoard/>
          </div>
      }
    }
    return(
        <div className="row">
        <br/>
          <div className="col-md-3">
            <ManagerSideBar />
          </div>
          
      
         <div className="col-md-6">
         {process()}
         </div>
            
            </div>
    )
}
export default ManagerDashboard;