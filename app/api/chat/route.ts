import { withEidentic } from "@eidentic/nextjs";
import { agent } from "@/lib/agent";

export const runtime = "nodejs"; // eidentic needs Node.js APIs

export const POST = withEidentic(agent);
