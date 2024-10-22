import markdownit from 'markdown-it';
import hljs from "highlight.js";
import purify from "dompurify";

const md = markdownit();

// Parse markdown to HTML, highlight code blocks and sanitize the output.
export function parseMarkdown(markdown: string): string {
    const htmlString = md.render(markdown);
    const htmlDocument = new DOMParser().parseFromString(htmlString, "text/html");
    const body = htmlDocument.body;
    const codeBlocks = body.querySelectorAll("pre code");
    codeBlocks.forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
    });
    return purify.sanitize(body.innerHTML);
}