import HomePage from "../pages/HomePage"
import LoginModal from "@component/components/modals/LoginModal"
import SideBar from "../components/SideBar"
import ForYou from "../pages/ForYou"
import Settings from "../pages/Settings"
import SignUpModal from "@component/components/modals/SignUpModal"
import Reset from "@component/components/modals/ResetModal"
import { useSelector } from "react-redux"
import AudioPlayer from '../components/AudioPlayer';

export default function Home() {
  return (
<div>
<HomePage/>
{/* <AudioPlayer/> */}
{/* <ForYou/> */}
{/* <Settings/> */}

    </div>
  )
}
