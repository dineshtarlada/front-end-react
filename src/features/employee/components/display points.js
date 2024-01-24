import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function DisplayPoints() {
  const [param] = useSearchParams();
  const [employee, setEmployee] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem("id");
    axios
      .get("http://localhost:8085/employees/user/" + userId)
      .then((response) => {
        setEmployee(response.data);
        localStorage.setItem('pointsBalance', response.data.pointsBalance);
      })
      .catch((error) => {
        console.error("Error fetching employee data", error);
      });
  }, []); // Ensure that the useEffect dependencies array is closed here

  return (
    <div>
      <span>
        <h3 style={{ fontWeight: 'bold' }}>{employee.pointsBalance}</h3>
      </span>
    </div>
  );
}

export default DisplayPoints;