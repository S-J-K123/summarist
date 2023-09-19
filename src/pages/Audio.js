import React from "react";
import SideBar from "@component/components/SideBar";
import Input from "../components/Input";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Audio = () => {
//   const [audio, setAudio] = useState();
//   const router = useRouter();
//  const { id } = router.query;
//  console.log(id);

//   useEffect(() => {
//     async function getAudio() {
//       const { data } = await axios.get(
//        `https://summarist.vercel.app/player/${id}`
//       );
//       setAudio(data);
//     }
//     getAudio();
//   }, [id]);

  return (
    <div>
      <SideBar />
      <div className="input-wrapper">
        <Input />
      </div>
    
     <div className="audio__wrapper" >
<div className="audio_track--wrapper">
<figure className="audio__track--image-mask">
    <figure className="book_image-wrapper">
        {/* <img/> */}
    </figure>
</figure>
<div className="audio__track--details-wrapper">
<div className="audio__track--title">word</div>
<div className="audio__track--author">word</div>
</div>
</div>
<div className="audio__controls--wrapper">
    <div className="audio__controls">
<button className="audio__controls--btn"></button>
<button className="audio__controls--btn audio__controls--btn-play">
<PlayArrowIcon/>
</button>
<button className="audio__controls--btn"></button>
    </div>
</div>
<div className="audio__progress--wrapper">
<div className="audio__time"></div>
<input type="range" value="0" max="292.872"  className="audio__progress--bar"/>
<div className="audio__time">time</div>
</div>
     </div>
  
    </div>
  );
};

export default Audio;
