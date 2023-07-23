import HomePage from "../pages/HomePage"
import LoginModal from "@component/components/modals/LoginModal"
import SideBar from "../components/SideBar"
import ForYou from "../pages/ForYou"
import SignUpModal from "@component/components/modals/SignUpModal"
import Reset from "@component/components/modals/ResetModal"
import { useSelector } from "react-redux"

export default function Home() {
  const username = useSelector(state => state.user.username)
console.log(username)
  return (
<div>
<HomePage/>
{/* <LoginModal/> */}
{/* <SideBar/> */}
{/* <ForYou/> */}
{/* <SignUpModal/> */}
{/* <ResetModal/> */}
    </div>
  )
}
