export default function ChatMessage({ message }) {
  const isAi = message.role === 'ai';

  return (
    <div className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isAi
            ? 'bg-secondary text-secondary-foreground rounded-tl-none'
            : 'bg-primary text-primary-foreground rounded-tr-none'
        }`}
      >
        <p className=" text-sm">{message.content}</p>
      </div>
    </div>
  );
}
