import axios from "axios";
const apiKey = "fc677a18-e1cc-4e4c-8573-c4a0b0535bef";
export async function createStream() {
  const body = {
    name: "test_stream",
    profiles: [
      {
        name: "720p",
        bitrate: 2000000,
        fps: 30,
        width: 1280,
        height: 720,
      },
      {
        name: "480p",
        bitrate: 1000000,
        fps: 30,
        width: 854,
        height: 480,
      },
      {
        name: "360p",
        bitrate: 500000,
        fps: 30,
        width: 640,
        height: 360,
      },
    ],
  };
  return await axios.post("https://livepeer.com/api/stream", body, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
export async function toggleStreamRecord() {
  return await axios.patch(
    `https://livepeer.com/api/stream/dcaa26a3-5603-4b7e-9510-e3ede05ad365/record`,
    { record: true },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
}
export async function getStreamData() {
  return await axios.get(
    `https://livepeer.com/api/stream/dcaa26a3-5603-4b7e-9510-e3ede05ad365`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
}
export async function deleteStream() {
  return await axios.get(
    `https://livepeer.com/api/stream/dcaa26a3-5603-4b7e-9510-e3ede05ad365`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
}
// dcaa26a3-5603-4b7e-9510-e3ede05ad365
