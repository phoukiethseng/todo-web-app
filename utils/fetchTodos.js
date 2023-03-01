import { pb } from "@/config/pocketbaseConfig";

async function fetchUserTodos(userId) {
  try {
    const records = await pb.collection("userTodos").getFullList({
      filter: `userId="${userId}"`,
    });
    const todos = records.map((record) => {
      // Sanitize records, remove any sensitive information before sending to client
      const {
        collectionId,
        collectionName,
        userId,
        userName,
        created,
        expand,
        updated,
        id,
        ...rest
      } = record;
      console.log("fetchUserTodos", rest);
      return rest;
    });
    return todos;
  } catch (err) {
    console.log("fetchUserTodos error", err);
    return null;
  }
}

export { fetchUserTodos };
