import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";




const DisplayTrack = ({ currentTrack }) => {
const [audio, seAudio] = useState({})
const id = useParams()
console.log(id);

async function fetchAudio(){
const { data } = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
seAudio(data)
console.log(data)
}

useEffect(() =>{
fetchAudio()
}, [])

  return (
    <div>
      {audio.audioLink}
      <audio className="audio" src= "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fthe-lean-startup.mp3?alt=media&token=c2f2b1d4-eaf2-4d47-8c8a-7a8fd062a47e" controls />
    </div>
  );
};
export default DisplayTrack;