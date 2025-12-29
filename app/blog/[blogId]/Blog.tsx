"use client";

import { PortableText } from "@portabletext/react";
import type { Post } from "@/types/type";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import type { PortableTextComponents } from "@portabletext/react";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SinglePostProps {
  singlePost: Post;
}

function CodeBlock({ value }: any) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <Button
        size="icon"
        onClick={handleCopy}
        className="absolute right-2 top-2 px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </Button>
      <SyntaxHighlighter
        language={value.language || "javascript"}
        style={vscDarkPlus}
        customStyle={{
          borderRadius: "8px",
          padding: "1.5rem",
          fontSize: "0.9rem",
        }}
      >
        {value.code}
      </SyntaxHighlighter>
    </div>
  );
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="leading-relaxed mb-5">{children}</p>
    ),
  },
  types: {
    code: CodeBlock,
  },
};

export default function Blog({ singlePost }: SinglePostProps) {
  return (
    <article className="prose prose-lg prose-indigo mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-2xl grow">
      <h1>{singlePost.title}</h1>

      {singlePost.body && (
        <PortableText value={singlePost.body} components={components} />
      )}
    </article>
  );
}
