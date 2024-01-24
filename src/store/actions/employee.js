import axios from "axios"

export const getEmployees = ()=>(dispatch)=>{
    console.log('in getEmployees of Action....')
    const managerId=localStorage.getItem("id")

    axios.get(`http://localhost:8085/managers/employees/all/${managerId}`)
    .then(response=> {
        //give the response to the reducer
        //dispatch({type : 'GET_LIST',payload: response.data})
        dispatch(
            {
                type : 'GET_LIST',
                payload: response.data
            } 
        )
    })
}
