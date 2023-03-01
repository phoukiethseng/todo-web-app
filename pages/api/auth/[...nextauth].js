import { authOptions } from "@/config/nextAuthConfig";
import nextAuth from "next-auth";

export default nextAuth(authOptions);
