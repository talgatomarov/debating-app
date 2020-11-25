import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { RouteComponentProps } from "react-router";
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import LobbyLayout from "containers/layout/LobbyLayout/index";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      margin: "auto",
      flexWrap: "wrap",
    },
    video: {
      height: window.innerHeight / 4,
      width: window.innerWidth / 5,
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

  return <video className={props.className} playsInline autoPlay ref={ref} />;
};

interface RouteParams {
  roomID: string;
  roomName: string;
}

const Room: React.FC<RouteComponentProps<RouteParams>> = (props) => {
  const classes = useStyles();
  const [peers, setPeers] = useState<any[]>([]);
  const socketRef = useRef<any>();
  const userVideo = useRef<any>();
  const peersRef = useRef<any[]>([]);
  const roomID = props.match.params.roomID;

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:8000");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users: any) => {
          const peers: any[] = [];
          users.forEach((userID: any) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload: any) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload: any) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, [roomID]);

  function createPeer(userToSignal: any, callerID: any, stream: any) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal: any, callerID: any, stream: any) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <LobbyLayout>
      <Container className={classes.container}>
        <Typography variant="h5">Room {props.match.params.roomName}</Typography>
        <Grid container spacing={1} style={{ marginTop: "20px" }}>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={6} sm={3} spacing={1}>
              <video
                className={classes.video}
                muted
                ref={userVideo}
                autoPlay
                playsInline
              />
            </Grid>
            {peers.map((peer, index) => {
              return (
                <Grid key={index} item xs={6} sm={3} spacing={1}>
                  <Video className={classes.video} key={index} peer={peer} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </LobbyLayout>
  );
};

export default Room;
