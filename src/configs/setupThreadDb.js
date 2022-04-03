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
  const client = Client.withKeyInfo(keyInfo);
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

  // const found = (await client).delete(threadID, "liveStreams", [
  //   "1d5fc9e3-fb28-4071-b6cc-cef9053181c5",
  //   "20bfd9eb-07a0-4716-a5e7-90cce18033a1",
  //   "3fe9c84b-2b9b-492e-96c6-bbbc15087291",
  //   "7eef05f2-5b12-401f-a9fe-499083f0ebbd",
  //   "848691b3-bbc9-4818-8df5-ba5225ecee4f",
  //   "ad04a250-3c01-423e-a6ca-c74914794225",
  //   "cc537893-3573-4e4d-a3ab-5e1b53babf64",
  // ]);
  // await found;
  // console.log(found);
  // const found = (await client).find(threadID, "liveStreams", {});
  // await found;
  // console.log(found);
  //   found.then((data) => console.log(data));
}
setupDB().then(() => {
  //   console.log();
});
