"use client";
import { useEffect } from "react";
import { js_beautify } from "js-beautify";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

export function Code({ children }) {
  useEffect(() => {
    hljs.registerLanguage("javascript", javascript);
    hljs.highlightAll();
  }, []);

  return (
    <div className="mockup-code text-start">
      {js_beautify(children)
        .split("\n")
        .map((line, index) => (
          <pre data-prefix={index + 1} key={index}>
            <code className="language-javascript">{line}</code>
          </pre>
        ))}
    </div>
  );
}
