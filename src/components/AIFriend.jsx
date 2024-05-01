import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { stackoverflowLight,stackoverflowDark,docco, xcode, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import '../css/AIFriend.css';
import {solarizedlight} from "react-syntax-highlighter/src/styles/prism";

function AIFriend() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [codeHighlightSettings, setCodeHighlightSettings] = useState({
        language: 'python',
        style: solarizedlight,
        customStyle: { fontSize: '11px' },
        showLineNumbers: true,
        wrapLines: true,
    });

    const themes = {
        'StackOverflow Light' : stackoverflowLight,
        'StackOverflow Dark' : stackoverflowDark,
        'Solarized Light': solarizedlight,
        'Docco': docco,
        'Xcode': xcode,
        'VS 2015': vs2015,
    };

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleGenerateText = async () => {
        setLoading(true); // Show the loader while fetching data
        try {
            // Make your API call here
            const apiUrl = 'https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=AIzaSyA8ldCM9qJ4Y0Eu7Nvn5noyfOgYpTcDkNs';
            const requestData = {
                prompt: {
                    text: prompt,
                },
            };

            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setResponse(response.data.candidates[0].output);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Hide the loader after fetching data
        }
    };

    const handleSettingChange = (name, value) => {
        setCodeHighlightSettings({ ...codeHighlightSettings, [name]: value });
    };

    return (
        <div className="container">
            <h1>AI Friend</h1>
            <div>
                <label htmlFor="prompt">Enter a text prompt: </label>
                <input
                    type="text"
                    id="prompt"
                    value={prompt}
                    onChange={handlePromptChange}
                />
            </div>
            <div>
                <button onClick={handleGenerateText}>Generate Text</button>
            </div>
            <div className="response-settings">
                <h2>Code Highlight Settings</h2>
                <form>
                    <div>
                        <label htmlFor="language">Language:</label>
                        <select
                            id="language"
                            value={codeHighlightSettings.language}
                            onChange={(e) => handleSettingChange("language", e.target.value)}
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            {/* Add more language options */}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="style">Theme:</label>
                        <select
                            id="style"
                            value={codeHighlightSettings.style}
                            onChange={(e) => handleSettingChange("style", themes[e.target.value])}
                        >
                            {Object.keys(themes).map((theme) => (
                                <option key={theme} value={theme}>
                                    {theme}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="showLineNumbers">Show Line Numbers:</label>
                        <input
                            type="checkbox"
                            id="showLineNumbers"
                            checked={codeHighlightSettings.showLineNumbers}
                            onChange={(e) => handleSettingChange("showLineNumbers", e.target.checked)}
                        />
                    </div>
                    <div>
                        <label htmlFor="wrapLines">Wrap Lines:</label>
                        <input
                            type="checkbox"
                            id="wrapLines"
                            checked={codeHighlightSettings.wrapLines}
                            onChange={(e) => handleSettingChange("wrapLines", e.target.checked)}
                        />
                    </div>
                </form>
            </div>
            <div className="generated-text">
                {loading ? (
                    <div className="loader"></div>
                ) : (
                    <SyntaxHighlighter {...codeHighlightSettings}>
                        {response}
                    </SyntaxHighlighter>
                )}
            </div>
        </div>
    );
}

export default AIFriend;
