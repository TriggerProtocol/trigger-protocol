import { Client, ThreadID } from "@textile/hub";
import { v4 as uuidv4 } from "uuid";

const keyInfo = {
  key: "bbaareicxg4kmofwx27hia4vdq3cvve5qjpgfeprhv33ynpkko3yeigsfjq",
  secret: "bvbxuyu25kq52z7om5oop2hv627pt5u5haehn63a",
};
const threadId = ThreadID.fromString(
  "bafkr5dscvt6762v2jiz4nc7byf2qddgizeqe3kgrzttmlz5co35whwa"
);

const portalCollectionName = "portals";
const streamsCollectionName = "liveStreams";

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
  await client.create(threadId, portalCollectionName, [data]);
}
export async function getAllPortalInstances() {
  const client = await getClient();
  return await client.find(threadId, portalCollectionName, {});
}
export async function getPortalInstance(id) {
  const client = await getClient();
  return await client.find(threadId, portalCollectionName, {
    _id: id,
  });
}

export async function createStreamInstance(
  portalId,
  appID,
  streamId,
  streamName,
  creatorAddress
) {
  const client = await getClient();
  const data = {
    _id: uuidv4(),
    portalId: portalId,
    appID: appID,
    streamId: streamId,
    streamName: streamName,
    creatorAddress: creatorAddress,
    createdAt: Date.now(),
  };
  await client.create(threadId, streamsCollectionName, [data]);
}
