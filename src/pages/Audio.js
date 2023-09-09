import React from "react";
import SideBar from "@component/components/SideBar";
import Input from "../components/Input";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Audio = () => {
  const [audio, setAudio] = useState();
  const router = useRouter();
 const { id } = router.query;
 console.log(id);

  useEffect(() => {
    async function getAudio() {
      const { data } = await axios.get(
       `https://summarist.vercel.app/player/${id}`
      );
      setAudio(data);
    }
    getAudio();
  }, [id]);

  return (
    <div>
      <SideBar />
      <div className="input-wrapper">
        <Input />
      </div>
    
            {audio.title}
     
  
    </div>
  );
};

export default Audio;
