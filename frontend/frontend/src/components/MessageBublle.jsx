import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


const MessageBubble = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed ${
          isUser
            ? "bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm"
            : "bg-white/[0.04] border border-white/[0.07] text-sky-200 rounded-tl-sm"
        }`}
      >
        <Markdown remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-xl font-bold mb-3">{children}</h1>
            ),

            h2: ({ children }) => (
              <h2 className="text-lg font-bold mb-2">{children}</h2>
            ),

            h3: ({ children }) => (
              <h3 className="text-base font-semibold mb-2">{children}</h3>
            ),

            p: ({ children }) => (
              <p className="mb-2 last:mb-0">{children}</p>
            ),

            ul: ({ children }) => (
              <ul className="list-disc ml-5 mb-2 space-y-1">
                {children}
              </ul>
            ),

            ol: ({ children }) => (
              <ol className="list-decimal ml-5 mb-2 space-y-1">
                {children}
              </ol>
            ),

            li: ({ children }) => (
              <li>{children}</li>
            ),

            strong: ({ children }) => (
              <strong className="font-bold text-white">
                {children}
              </strong>
            ),

            code: ({ children, className }) => {
              const isBlock = className?.includes("language-");

              return isBlock ? (
                <pre className="bg-black/40 rounded-lg p-3 my-3 overflow-x-auto">
                  <code className={className}>{children}</code>
                </pre>
              ) : (
                <code className="bg-black/30 px-1.5 py-0.5 rounded text-sm">
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
};

export default MessageBubble;