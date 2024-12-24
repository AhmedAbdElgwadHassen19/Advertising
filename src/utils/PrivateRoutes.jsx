import { Outlet, Navigate } from "react-router-dom";

const PrivateReact = ()=>{
    const  user = true 
    user ? <Outlet/> : <Navigate to={'/login'}/>
}
export default PrivateReact