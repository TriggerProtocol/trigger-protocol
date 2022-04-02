import { Client, ThreadID, Where } from "@textile/hub";
import { v4 as uuidv4 } from "uuid";

const keyInfo = {
  key: "b2egkfew56zujbv7k7rpfq7l4sa",
  secret: "bvbxuyu25kq52z7om5oop2hv627pt5u5haehn63a",
};
const threadId = ThreadID.fromString(
  "bafkr5dscvt6762v2jiz4nc7byf2qddgizeqe3kgrzttmlz5co35whwa"
);

const portalCollectionName = "portals";
const streamsCollectionName = "liveStreams";
export interface IStreamData {
  _id: string;
  portalId: string;
  appID: string;
  streamId: string;
  streamName: string;
  creatorAddress: string;
  createdAt: string;
}
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
export async function getPortalInstance(id: string) {
  const client = await getClient();
  return await client.find(threadId, portalCollectionName, {});
}
export async function getStreamInstance(
  portalId: string
): Promise<IStreamData[] | IStreamData> {
  const client = await getClient();
  const query = new Where("portalId").eq(portalId);
  console.log(query);
  return await client.find<IStreamData>(threadId, streamsCollectionName, query);
}
export async function getStreamInstanceId(id: string): Promise<IStreamData[]> {
  const client = await getClient();
  const query = new Where("_id").eq(id);
  console.log(query);
  return await client.find<IStreamData>(threadId, streamsCollectionName, query);
}
export async function createStreamInstance(
  portalId: string,
  appID: string,
  streamId: string,
  streamName: string,
  creatorAddress: string
) {
  const client = await getClient();
  const data: IStreamData = {
    _id: uuidv4(),
    portalId: portalId,
    appID: appID,
    streamId: streamId,
    streamName: streamName,
    creatorAddress: creatorAddress,
    createdAt: Date.now().toString(),
  };
  console.log(data);
  await client.create(threadId, streamsCollectionName, [data]);
}
