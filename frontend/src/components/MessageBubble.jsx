import { useState, useCallback, memo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy, X } from "lucide-react";

// Copy Button Component for Code Blocks
const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code to clipboard"
      className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 bg-white/5 hover:bg-white/10 rounded-md transition-colors cursor-pointer border border-white/5"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400 font-medium">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
};

// Safe Markdown Content Normalizer
const getMarkdownContent = (data) => {
  if (typeof data === "string") return data;
  if (data?.content) return String(data.content);
  if (data?.text) return String(data.text);
  if (data?.message) return String(data.message);
  if (typeof data === "object" && data !== null) {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return "";
    }
  }
  return "";
};

const MessageBubble = memo(({ role, content, images = [] }) => {
  const isUser = role === "user";
  const [lightbox, setLightbox] = useState(null);

  const markdownContent = getMarkdownContent(content);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} my-2`}
    >
      <div
        className={`relative max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-xs transition-all ${
          isUser
            ? "bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white rounded-tr-xs"
            : "bg-slate-900/80 border border-slate-800 text-slate-200 rounded-tl-xs backdrop-blur-md"
        }`}
      >
        {/* Attachment Images */}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mb-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-xl border border-white/10 bg-black/20"
              >
                <img
                  src={img}
                  alt={`Attachment ${i + 1}`}
                  loading="lazy"
                  onClick={() => setLightbox(img)}
                  onError={(e) => e.currentTarget.remove()}
                  className="w-36 h-24 object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-200 ease-out"
                />
              </div>
            ))}
          </div>
        )}

        {/* Markdown Renderer */}
        {markdownContent && (
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-xl font-bold mb-3 tracking-tight border-b border-white/10 pb-1">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-semibold mb-2.5 tracking-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-medium mb-2">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-2.5 last:mb-0 leading-relaxed opacity-95">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc ml-5 mb-3 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal ml-5 mb-3 space-y-1">{children}</ol>
              ),
              li: ({ children }) => <li className="pl-1">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-indigo-400 pl-3 italic my-2 text-slate-300">
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-3 rounded-lg border border-white/10">
                  <table className="w-full text-left border-collapse text-xs">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="bg-white/5 p-2 font-semibold border-b border-white/10">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="p-2 border-b border-white/5">{children}</td>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-white">{children}</strong>
              ),
              code: ({ inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                const codeString = String(children).replace(/\n$/, "");

                if (!inline && match) {
                  return (
                    <div className="relative my-3 rounded-xl overflow-hidden border border-slate-800 bg-[#1e1e1e]">
                      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
                        <span className="font-mono text-[11px] uppercase tracking-wider font-medium">
                          {match[1]}
                        </span>
                        <CopyButton code={codeString} />
                      </div>
                      <SyntaxHighlighter
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          padding: "1rem",
                          fontSize: "12.5px",
                          lineHeight: "1.5",
                          backgroundColor: "transparent",
                        }}
                        {...props}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  );
                }

                return (
                  <code
                    className={`px-1.5 py-0.5 rounded text-[12.5px] font-mono ${
                      isUser
                        ? "bg-white/20 text-white"
                        : "bg-slate-800/80 text-sky-300 border border-slate-700/50"
                    }`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdownContent}
          </Markdown>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 transition-all animate-in fade-in duration-200"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-5 right-5 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-colors cursor-pointer"
            onClick={closeLightbox}
            aria-label="Close fullscreen preview"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={lightbox}
            alt="Expanded preview"
            className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
});

MessageBubble.displayName = "MessageBubble";

export default MessageBubble;