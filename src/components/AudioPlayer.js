import DisplayTrack from './DisplayTrack';
// import Controls from './Controls';
// import ProgressBar from './ProgressBar';

const AudioPlayer = () => {
  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack />
        {/* <Controls />
        <ProgressBar /> */}
      </div>
    </div>
  );
};
export default AudioPlayer;