export const createOffer = async (
  conn: any,
  localStream: any,
  userToCall: any,
  doOffer: any,
  database: any,
  username: any
) => {
  try {
    conn.addStream(localStream);

    const offer = await conn.createOffer();
    await conn.setLocalDescription(offer);

    doOffer(userToCall, offer, database, username);
  } catch (exception) {
    console.error(exception);
  }
};

export const initiateLocalStream = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    return stream;
  } catch (exception) {
    console.error(exception);
  }
};

export const initiateConnection = async () => {
  try {
    // using Google public stun server
    var configuration = {
      iceServers: [{ urls: "stun:stun2.l.google.com:19302" }],
    };

    const conn = new RTCPeerConnection(configuration);

    return conn;
  } catch (exception) {
    console.error(exception);
  }
};

export const listenToConnectionEvents = (
  conn: any,
  username: any,
  remoteUsername: any,
  database: any,
  remoteVideoRef: any,
  doCandidate: any
) => {
  conn.onicecandidate = function (event: any) {
    if (event.candidate) {
      doCandidate(remoteUsername, event.candidate, database, username);
    }
  };

  // when a remote user adds stream to the peer connection, we display it
  conn.ontrack = function (event: any) {
    if (remoteVideoRef.current.srcObject !== event.streams[0]) {
      remoteVideoRef.current.srcObject = event.streams[0];
    }
  };
};

export const sendAnswer = async (
  conn: any,
  localStream: any,
  notif: any,
  doAnswer: any,
  database: any,
  username: any
) => {
  try {
    conn.addStream(localStream);

    const offer = JSON.parse(notif.offer);
    conn.setRemoteDescription(offer);

    // create an answer to an offer
    const answer = await conn.createAnswer();
    conn.setLocalDescription(answer);

    doAnswer(notif.from, answer, database, username);
  } catch (exception) {
    console.error(exception);
  }
};

export const startCall = (yourConn: any, notif: any) => {
  const answer = JSON.parse(notif.answer);
  yourConn.setRemoteDescription(answer);
};

export const addCandidate = (yourConn: any, notif: any) => {
  // apply the new received candidate to the connection
  const candidate = JSON.parse(notif.candidate);
  yourConn.addIceCandidate(new RTCIceCandidate(candidate));
};
