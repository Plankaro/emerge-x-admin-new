"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Quill's CSS for the editor
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Helper for classnames from ShadCN

// Dynamically load react-quill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextEditorProps {
    placeholder?: string;
    setValue?: (value: string) => void;
    value: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ placeholder, setValue, value }) => {


    const modules = {
        toolbar: [

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'font': [] }],

            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction



            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ]
    }

    return (
        <div className="p-4 border rounded-md shadow-sm bg-white h-80">
            <h2 className="text-lg font-semibold mb-2">Rich Text Editor</h2>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                placeholder={placeholder || "Write something..."}
                className="h-40 mb-4"
            />
        </div>
    );
};

export default RichTextEditor;