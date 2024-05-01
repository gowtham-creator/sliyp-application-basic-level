import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';

const CodeEditor = () => {
    const [code, setCode] = useState('// Write your code here');
    const [language, setLanguage] = useState('javascript');
    const editorRef = useRef(null);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    useEffect(() => {
        if (editorRef.current) {
            // Access the Monaco Editor instance
            const editor = editorRef.current.editor;

            // Set the language for the editor
            MonacoEditor.editor.setModelLanguage(editor.getModel(), language);
        }
    }, [language]);

    return (
        <div>
            <div>
                <label>Language: </label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="c">C</option>
                    <option value="cpp">CPP</option>

                    {/* Add more language options as needed */}
                </select>
            </div>
            <MonacoEditor
                ref={editorRef} // Assign the ref
                width="800"
                height="600"
                language={language}
                theme="vs-dark"
                value={code}
                options={{
                    selectOnLineNumbers: true,
                }}
                onChange={handleCodeChange}
            />
        </div>
    );
};

export default CodeEditor;
