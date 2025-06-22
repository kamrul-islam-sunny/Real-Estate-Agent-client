// components/AITitleGenerator.tsx
"use client";
import { useState } from "react";
import {Bot } from "lucide-react";
import { generateAITitle } from "@/helper/generateByAi/generateTitle";

interface AITitleGeneratorProps {
  onTitleGenerated: (title: string) => void;
  buttonClassName?: string;
  iconClassName?: string;
  methods?:any;
}

export const AITitleGenerator = ({
  onTitleGenerated,
  buttonClassName = "absolute right-2 top-7 p-1  hover:bg-gray-100",
  iconClassName = "w-5 h-5 text-gray-500"
}: AITitleGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState(null);
  const [ans, setAns] = useState(null);
  const [showAIPrompt, setShowAIPrompt] = useState(false);

  const handleGenerateTitle = async () => {
    setIsGenerating(true);
    const generatedTitle = await generateAITitle(aiPrompt?aiPrompt:"");
    if (generatedTitle) {
      setAns(generatedTitle);
      onTitleGenerated(generatedTitle);
      setAiPrompt(null)
      setShowAIPrompt(false);
    }
    setIsGenerating(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowAIPrompt(true)}
        className={`${buttonClassName} absolute `}
        title="Generate title with AI"
      >
        <Bot className={`${iconClassName}`} />
      </button>

      {showAIPrompt && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-white opacity-100 p-6  border-dashed border-2 max-w-md w-full">
            <h3 className="font-bold text-lg mb-4">Generate  with  AI</h3>
            <textarea
              defaultValue={aiPrompt?aiPrompt:ans||""} 
              onChange={(e:any) => setAiPrompt(e.target.value)}
              className="w-full h-32 p-2 border rounded mb-4 "
              placeholder="Describe your topic to generate a text..."
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAIPrompt(false)}
                className="px-4 py-2 border"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateTitle}
                disabled={isGenerating}
                className="px-4 py-2 bg-blue-600 text-white  disabled:opacity-50"
              >
                {isGenerating ? "Generating..." : "Generate Title"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};