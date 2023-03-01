import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.POCKETBASE_URL);
pb.autoCancellation(false);

console.log("pocketbaseConfig.js loaded");

export { pb };
