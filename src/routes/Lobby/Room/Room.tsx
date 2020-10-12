import React, { useState, useRef, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  createOffer,
  initiateConnection,
  sendAnswer,
  addCandidate,
  initiateLocalStream,
  listenToConnectionEvents,
} from "modules/RTCModule";
import {
  doOffer,
  doCandidate,
  doAnswer,
  doUpdate,
} from "modules/FirebaseModule";
import firebase from "firebase/app";
import { useStores } from "hooks";
import PlayerModel from "stores/RoomStore/PlayerModel";
import { IPlayerModel } from "stores/RoomStore/interfaces";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme, Container } from "@material-ui/core";
import { cloneNode } from "@babel/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    video: {
      height: "40%",
      width: "50%",
    },
  })
);

const Video = (props: any) => {
  const ref = useRef<any>();
  useEffect(() => {
    props.peer.on("stream", (stream: any) => {
      ref.current.srcObject = stream;
    });
  }, [props.peer]);

  return (
    <video
      style={{ height: "40%", width: "50%" }}
      playsInline
      autoPlay
      ref={ref}
    />
  );
};

const RoomPage: React.FC<RouteComponentProps> = (props) => {
  const { roomStore } = useStores();
  const classes = useStyles();
  const [peers, setPeers] = useState<IPlayerModel[]>([]);
  const [database, setDatabase] = useState<any>();
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [localConn, setLocalConn] = useState<any>();
  const localVideoRef = useRef<any>();
  const remoteVideoRef = useRef<any>();
  // const roomID = props.match.params.roomID;

  useEffect(() => {
    roomStore.getPlayersbyRoomId();
  }, [roomStore.players]);

  useEffect(() => {
    const db = firebase.firestore();
    setDatabase(db);

    async function initializeSettings() {
      await initiateLocalStream().then((stream) => {
        setLocalStream(stream);
        localVideoRef.current.srcObject = stream;
      });

      await initiateConnection().then((conn) => {
        setLocalConn(conn);
        if (localStream) {
          localStream
            .getTracks()
            .forEach((track) => localConn.addTrack(track, localStream));
        }
      });

      const player = new PlayerModel();
      player.username = "Aiya"; //TODO: get username from localStorage(?)
      roomStore.players.push(player);
      roomStore.players.forEach((p: IPlayerModel) => {
        if (p.username !== player.username) {
          addPeer(p.username);
          startCall(player.username, p.username);
        }
      });

      await doUpdate(player.username, db, handleUpdate);
    }

    initializeSettings();
  }, []);

  const addPeer = (name: any) => {
    const peer = new PlayerModel();
    peer.username = name;
    setPeers([...peers, peer]);
  };

  const startCall = async (username: any, userToCall: any) => {
    listenToConnectionEvents(
      localConn,
      username,
      userToCall,
      database,
      remoteVideoRef,
      doCandidate
    );
    createOffer(
      localConn,
      localStream,
      userToCall,
      doOffer,
      database,
      username
    );
    const peer = peers.find((p: IPlayerModel) => p.username === userToCall);
    if (peer) {
      peer.ref = remoteVideoRef;
    }
  };

  const handleUpdate = (notif: any, username: any) => {
    if (notif) {
      switch (notif.type) {
        case "video-offer":
          const newPeer = new PlayerModel();
          newPeer.username = notif.from;
          newPeer.ref = JSON.parse(notif.offer); //TODO: understand how to set ref and where to get it from
          setPeers([...peers, newPeer]);
          listenToConnectionEvents(
            localConn,
            username,
            newPeer.username,
            database,
            newPeer.ref,
            doCandidate
          );
          sendAnswer(
            localConn,
            localStream,
            notif,
            doAnswer,
            database,
            username
          );
          break;
        case "video-answer":
          startCall(localConn, notif);
          break;
        case "new-ice-candidate":
          addCandidate(localConn, notif);
          break;
        default:
          break;
      }
    }
  };
  async function create(name: any) {
    // const id = uuid();
    props.history.push(`${props.match.url}/room`);
  }

  return (
    <Container>
      <video
        className={classes.video}
        muted
        ref={localVideoRef}
        autoPlay
        playsInline
      ></video>
      {peers.map((peer: any, index: number) => {
        return <Video key={index} peer={peer} />;
      })}
    </Container>
    // <button onClick={create}>Create room</button>
  );
};

export default RoomPage;
