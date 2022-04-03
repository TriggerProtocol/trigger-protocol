const { Client, ThreadID } = require("@textile/hub");
const keyInfo = {
  key: "b2egkfew56zujbv7k7rpfq7l4sa",
  secret: "bvbxuyu25kq52z7om5oop2hv627pt5u5haehn63a",
};
const threadID = ThreadID.fromString(
  "bafkr5dscvt6762v2jiz4nc7byf2qddgizeqe3kgrzttmlz5co35whwa"
);

const portalSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Portal",
  type: "object",
  properties: {
    _id: { type: "string" },
    portalName: { type: "string" },
    appID: { type: "string" },
    description: { type: "string" },
    thumbnail: { type: "string" },
    creator: { type: "string" },
  },
};
const liveStreamSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Live Stream",
  type: "object",
  properties: {
    _id: { type: "string" },
    portalId: { type: "string" },
    appID: { type: "string" },
    streamId: { type: "string" },
    streamName: { type: "string" },
    creatorAddress: { type: "string" },
    createdAt: { type: "string" },
  },
};
async function setupDB() {
  // Initialize the client
  const client = await Client.withKeyInfo(keyInfo);
  // const threads = (await client).listThreads();
  // console.log(await threads);
  //   (await client).deleteDB(
  //     ThreadID.fromString(
  //       "bafk3njiebqvroe3fha46scf4bjjqmhi6qt3f6ujkgcbbzsmqttx6gty"
  //     )
  //   );
  // Create a new DB
  // const threadID = (await client).newDB(undefined, "portalDb");
  // (await client).deleteCollection(threadID,"liveStreams")
  // (await client).newCollection(threadID, {
  //   name: "liveStreams",
  //   schema: liveStreamSchema,
  // });
  // console.log("collection Created");
  //   return (await threadID).toString();

  // const found = (await client).delete(threadID, "liveStreams");
  // await found;
  // console.log(found);
  const found = await client.find(threadID, "portals", {});
  console.log(found)
  // let ids = found.map((data) => {
  //   return data._id;
  // });
  // console.log(ids);
  // client.delete(threadID, "portals", ids).then((data) => {});
}
setupDB().then(() => {
  //   console.log();
});
