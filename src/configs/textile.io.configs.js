import { Client, ThreadID } from "@textile/hub";
const keyInfo = {
  key: "bbaareicxg4kmofwx27hia4vdq3cvve5qjpgfeprhv33ynpkko3yeigsfjq",
  // secret: "bvbxuyu25kq52z7om5oop2hv627pt5u5haehn63a",
};
const threadId = ThreadID.fromString(
  "bafkr5dscvt6762v2jiz4nc7byf2qddgizeqe3kgrzttmlz5co35whwa"
);

const collectionName = "portals";

async function getClient() {
  const client = await Client.withKeyInfo(keyInfo);
  return client;
}

export async function createPortalInstance() {
  const client = await getClient();
  const data = {
    _id: "dsewew",
    portalName: "sasasa",
    appID: "dsdsdsds",
    descrtiption: "dsdwdsds",
    thumbnail: "sasasasa",
    creator: "e3232swdw",
  };
  await client.create(threadId, collectionName, [data]);
}
export async function getAllPortalInstances() {
  const client = await getClient();
  return await client.find(threadId, collectionName, {});
}
export async function getPortalInstance(id) {
  const client = await getClient();
  return await client.find(threadId, collectionName, {
    _id: id,
  });
}
