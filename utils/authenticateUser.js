import { pb } from "@/config/pocketbaseConfig";

// Verify credential and return user information
async function authenticateUser(username, password) {
  console.log("attempting to retrieve record from pocketbase");
  const userRecord = await pb
    .collection("users")
    .getFirstListItem(`username="${username}"`);
  console.log("pb return ", userRecord);
  if (userRecord.password !== password) {
    return null; // User enter incorrect password
  }
  return {
    id: userRecord.id,
    name: userRecord.name,
    email: userRecord.email,
  };
}

export { authenticateUser };
