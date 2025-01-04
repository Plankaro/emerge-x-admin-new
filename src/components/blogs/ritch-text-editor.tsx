"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Head from "next/head"; // Import next/head to inject the script

interface RichTextEditorProps {
  placeholder?: string;
  setValue?: (value: string) => void;
  value: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ placeholder, setValue, value }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  // Load the TinyMCE script dynamically
  useEffect(() => {
    // Inject the TinyMCE CDN script in the head tag when the component is mounted
    const script = document.createElement("script");
    script.src = "https://cdn.tiny.cloud/1/ar3vmejkekgibkqlwag1zjadp2yqtmfa8m9re2vpuo1e5oi4/tinymce/7/tinymce.min.js";
    script.async = true;
    script.referrerPolicy = "origin";
    document.head.appendChild(script);

    script.onload = () => {
      setEditorLoaded(true); // Set the editor as loaded once the script is ready
    };

    return () => {
      // Clean up the script when the component is unmounted
      document.head.removeChild(script);
    };
  }, []);

  const handleEditorChange = (content: string) => {
    if (setValue) {
      setValue(content); // Pass the content to the parent component
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-sm bg-white h-80">
      <h2 className="text-lg font-semibold mb-2">Rich Text Editor</h2>
      {editorLoaded && (
        <Editor      apiKey='ar3vmejkekgibkqlwag1zjadp2yqtmfa8m9re2vpuo1e5oi4'

          value={value}
          init={{
            height: 260,
            menubar: false,
            plugins: [
              "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
              "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "help", "wordcount",
              "checklist", "mediaembed", "casechange", "export", "formatpainter", "pageembed", "a11ychecker",
              "tinymcespellchecker", "permanentpen", "powerpaste", "advtable", "advcode", "editimage", "advtemplate",
              "ai", "mentions", "tinycomments", "tableofcontents", "footnotes", "mergetags", "autocorrect", "typography",
              "inlinecss", "markdown", "importword", "exportword", "exportpdf"
            ],
            toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
            apiKey: "ar3vmejkekgibkqlwag1zjadp2yqtmfa8m9re2vpuo1e5oi4", // Your TinyMCE API Key
          }}
          onEditorChange={handleEditorChange}
        />
      )}
    </div>
  );
};

export default RichTextEditor;
