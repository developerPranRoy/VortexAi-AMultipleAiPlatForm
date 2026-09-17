import { useState } from "react";
import {
    Copy,
    Download,
    Expand,
    FileCode2,
    FolderOpen,
    Eye,
    FileText,
} from "lucide-react";

const files = [
    "package.json",
    "server.js",
    "routes/auth.js",
    "controllers/auth.controller.js",
    "middlewares/auth.middleware.js",
    "docker-compose.yml",
];

const code = `import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(5000, () => {
  console.log("Server Started");
});
`;

const Artifact = () => {
    const [tab, setTab] = useState("code");

    return (
        <aside className="w-[420px] h-screen bg-[#0d1117] border-l border-[#21262d] flex flex-col">

            {/* Header */}

            <div className="h-16 border-b border-[#21262d] px-5 flex items-center justify-between">

                <h2 className="font-semibold text-white">
                    Artifact
                </h2>

                <div className="flex gap-2">

                    <button className="p-2 rounded-lg hover:bg-[#161b22]">
                        <Copy size={16} />
                    </button>

                    <button className="p-2 rounded-lg hover:bg-[#161b22]">
                        <Download size={16} />
                    </button>

                    <button className="p-2 rounded-lg hover:bg-[#161b22]">
                        <Expand size={16} />
                    </button>

                </div>

            </div>

            {/* Tabs */}

            <div className="flex border-b border-[#21262d]">

                <button
                    onClick={() => setTab("code")}
                    className={`flex-1 py-3 text-sm ${tab === "code"
                            ? "border-b-2 border-blue-500 text-white"
                            : "text-zinc-500"
                        }`}
                >
                    <div className="flex justify-center gap-2 items-center">
                        <FileCode2 size={16} />
                        Code
                    </div>
                </button>

                <button
                    onClick={() => setTab("preview")}
                    className={`flex-1 py-3 text-sm ${tab === "preview"
                            ? "border-b-2 border-blue-500 text-white"
                            : "text-zinc-500"
                        }`}
                >
                    <div className="flex justify-center gap-2 items-center">
                        <Eye size={16} />
                        Preview
                    </div>
                </button>

                <button
                    onClick={() => setTab("files")}
                    className={`flex-1 py-3 text-sm ${tab === "files"
                            ? "border-b-2 border-blue-500 text-white"
                            : "text-zinc-500"
                        }`}
                >
                    <div className="flex justify-center gap-2 items-center">
                        <FolderOpen size={16} />
                        Files
                    </div>
                </button>

            </div>

            {/* Content */}

            <div className="flex-1 overflow-y-auto">

                {tab === "code" && (
                    <pre className="p-5 text-sm leading-7 text-zinc-300 overflow-auto">
                        <code>{code}</code>
                    </pre>
                )}

                {tab === "preview" && (
                    <div className="p-5">

                        <div className="rounded-xl border border-[#30363d] p-6">

                            <h2 className="text-lg font-semibold">
                                Authentication Service
                            </h2>

                            <p className="mt-3 text-zinc-400">
                                Express + JWT + MongoDB
                            </p>

                        </div>

                    </div>
                )}

                {tab === "files" && (
                    <div className="p-4 space-y-2">

                        {files.map((file) => (
                            <button
                                key={file}
                                className="w-full flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-[#161b22]"
                            >
                                <FileText size={16} />

                                <span className="text-sm truncate">
                                    {file}
                                </span>

                            </button>
                        ))}

                    </div>
                )}

            </div>

            {/* Footer */}

            <div className="border-t border-[#21262d] p-4">

                <div className="rounded-xl bg-[#161b22] p-4">

                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                        Generated By
                    </p>

                    <p className="mt-2 font-medium">
                        Coding Agent
                    </p>

                    <p className="text-sm text-green-400 mt-1">
                        ✓ Completed
                    </p>

                </div>

            </div>

        </aside>
    );
};

export default Artifact;