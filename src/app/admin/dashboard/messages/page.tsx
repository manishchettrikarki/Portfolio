import { getMessages } from "@/lib/data/messages";
import { MessageRow } from "./MessageRow";

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Contact messages</h1>
      <div className="flex flex-col gap-3">
        {messages.map((m) => (
          <MessageRow key={m.id} message={m} />
        ))}
        {messages.length === 0 && (
          <p className="text-sm text-neutral-500">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
