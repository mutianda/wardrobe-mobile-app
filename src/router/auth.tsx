import { Navigate,Outlet,useLocation} from 'react-router-dom'
import { useUserStore } from '../store/userStore'



export function AuthRoute(){

    const token = useUserStore(state=>state.token)
    const location =useLocation()

    if(!token){
        //地址存入state 登录回跳
        return <Navigate to='/login' state={{ from: location.pathname + location.search }} replace></Navigate>
    }
    return <Outlet/>
}


export function LoginRoute(){
    const token = useUserStore(state=>state.token)

    if(token){
        return <Navigate to='/' replace></Navigate>
    }
    return <Outlet/>

}