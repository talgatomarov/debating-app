export const doOffer = async (
  target: any,
  offer: any,
  database: any,
  name: any
) => {
  await database
    .collection("notifs")
    .doc(target)
    .update({
      type: "video-offer",
      from: name,
      offer: JSON.stringify(offer),
    });
};

export const doAnswer = async (
  target: any,
  answer: any,
  database: any,
  name: any
) => {
  await database
    .collection("notifs")
    .doc(target)
    .update({
      type: "video-answer",
      from: name,
      answer: JSON.stringify(answer),
    });
};

export const doCandidate = async (
  target: any,
  candidate: any,
  database: any,
  name: any
) => {
  await database
    .collection("notifs")
    .doc(target)
    .update({
      type: "new-ice-candidate",
      from: name,
      candidate: JSON.stringify(candidate),
    });
};

export const doUpdate = async (name: any, database: any, handleUpdate: any) => {
  // await database.collection("notifs").doc(name).delete();
  const dbdata = database
    .collection("notifs")
    .doc(name)
    .get()
    .then((data: any) => console.log(data));

  // data.forEach((snapshot: any) => {
  //   handleUpdate(snapshot.val(), name);
  // });
};
