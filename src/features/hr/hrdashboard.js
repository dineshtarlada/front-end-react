import { useSearchParams } from "react-router-dom"



import HrSideBar from "./components/hrsidebar"
import HrAddEmployeesComponent from "./components/addemployees"
import MyEmployeesComponent from "./components/ouremployees"
import HrAddProductsComponent from "./components/addproducts"
import { useState } from "react"

function HrDashboard(){
    const [param]=useSearchParams()
    const [qStr,setQstr] = useState('')

  const searchProducts = (str)=>{
      console.log('seach func in parent comp called.....' + str)
      setQstr(str);
  }
    const process = ()=>{
        if(!param.get('page')){
          return  <div>
              
          <MyEmployeesComponent/>
           
          
       </div>
      }
        if(param.get('page')==='myEmployees'){
            return  <div>
              
           <MyEmployeesComponent/>
            
           
        </div>
        }
       
       
        if(param.get('page') === 'addproducts'){
          return <div>
             <HrAddProductsComponent func={searchProducts} strVal={qStr}/>
          </div>
        }
        
          if(param.get('page') === 'addemployees'){
            return <div className="col-md-3 ">
            <HrAddEmployeesComponent/>
          </div>
      }
    }
    return(
        <div className="row">
        <br/>
          <div className="col-md-3">
            <HrSideBar />
          </div>
          
      
         <div className="col-md-6">
         {process()}
         </div>
            
            </div>
    )
}
export default HrDashboard;