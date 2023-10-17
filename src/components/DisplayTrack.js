import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";




const DisplayTrack = ({ currentTrack, audio }) => {
const id = useParams()
console.log(audio);



  return (
    <div>
      <audio  src={audio?.audioLink} controls />
    </div>
  );
};
export default DisplayTrack;