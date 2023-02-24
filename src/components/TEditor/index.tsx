import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { BASE_URL } from '../../../config/defaultSettings';

export default function Index({ config = {}, onChange = undefined, value = "", }) {
    const editorRef = useRef(null);
    const [initialValue, setInitialValue] = useState(value);
    return (
        <Editor
            onEditorChange={(e) => {
                onChange(e);
            }}
            onInit={(evt, editor) => editorRef.current = editor}
            tinymceScriptSrc={`${BASE_URL}tinymce/tinymce.min.js`}
            initialValue={initialValue}
            init={{
                language: "zh_CN",
                language_url: `${BASE_URL}tinymce/langs/zh_CN.js`,
                height: 500,
                width: "100%",
                menubar: false,
                plugins: [
                    'a11ychecker', 'advlist', 'code', 'advtable', 'autolink', 'checklist', 'export',
                    'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                    'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table',  'wordcount'
                ],
                toolbar: 'anchor undo redo | casechange blocks | bold italic backcolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist checklist outdent indent | removeformat | code table preview',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                ...config
            }}
        />
    )
}
