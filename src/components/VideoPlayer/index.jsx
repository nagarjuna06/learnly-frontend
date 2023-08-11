import ReactPlayer from "react-player";
import Images from "../Images";
import { MdPlayCircleOutline } from "react-icons/md";

const VideoPlayer = (props) => {
  const { url, thumbnail, handleOnEnded = () => {} } = props;
  return (
    <div
      style={{
        position: "relative",
        paddingTop: "56.25%",
        border: "3px solid #faaf0088",
      }}
    >
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        playing
        onEnded={handleOnEnded}
        playIcon={
          <MdPlayCircleOutline
            size={80}
            style={{ color: "#fff", filter: "drop-shadow(0px 4px 15px #222)" }}
          />
        }
        light={thumbnail || Images.videoThumbnail}
        style={{ position: "absolute", top: 0, left: 0 }}
        config={{
          youtube: {
            playerVars: { showinfo: 1 },
          },
          facebook: {
            appId: "12345",
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
