// components/FieldRenderer.tsx
import RichTextEditor from "@/components/editor";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { GenerateDataWithAi } from "@/helper/GenerateDataWithAi/GenerateDataWithAi";
import { useState } from "react";
import { Clock, Loader2, RefreshCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GlobalKeywordInput from "../../inputs/GlobalKeywordInput/GlobalKeywordInput";

interface FieldRendererProps {
  FieldConfig: {
    label: string;
    valueKey: string;
    placeholder?: string;
    type: "text" | "richtext" | "keywords";
  }[];
  metaData: Record<string, any>;
  setMetaData: (meta: Record<string, any>) => void;
  methods: any;
  setHistoryModal: (modal: { open: boolean; field: any }) => void;
  setMetaDataHistory: React.Dispatch<React.SetStateAction<any>>;
}

export default function GlobalFieldRenderer({
  FieldConfig,
  metaData,
  setMetaData,
  methods,
  setHistoryModal,
  setMetaDataHistory,
}: FieldRendererProps) {
  const [updateLoading, setUpdateLoading] = useState(false);

  const handeUpdate = async (data: string, type: string) => {
    setUpdateLoading(true);
    try {
      // Use a different prompt for keywords
      const updatedCommand =
        type === "keywords"
          ? `Generate a list of relevant SEO keywords (separete with comma) based on this: ${metaData[data]}`
          : type === "richtext"
          ? `Generate a well-formatted description with HTML tags suitable for a rich text editor (like in MS Word). Include elements like <h1> to <h6>, <p>, <i>, <b>, <a>, <ul>, <li>, <ol>, and <u> based on this content: ${metaData[data]}`
          : `Update this: ${metaData[data]}`;

      console.log({ updatedCommand });

      const generatedContent = await GenerateDataWithAi(updatedCommand);

      const updatedMetaData = {
        ...metaData,
        [data]:
          type === "keywords"
            ? generatedContent.split(/\s*,\s*/).map((k) => k.trim())
            : generatedContent,
      };

      setMetaData(updatedMetaData);
      methods.setValue(data, updatedMetaData[data]);

      setMetaDataHistory((prev: any) => ({
        ...prev,
        [data]: [...(prev[data] || []), updatedMetaData[data]],
      }));
    } catch {
      console.log("Failed to generate content. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <>
      {FieldConfig.map(({ label, valueKey, placeholder, type }) => {
        const field = { label, valueKey, placeholder, type };
        return (
          <FormItem key={valueKey}>
            <TooltipProvider>
              <div className="flex justify-between items-center gap-2">
                <FormLabel>{label}</FormLabel>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => handeUpdate(valueKey, type)}
                      className="text-blue-500 hover:text-blue-600 cursor-pointer ml-auto"
                      disabled={updateLoading}
                    >
                      {updateLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCcw className="w-4 h-4" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Update</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setHistoryModal({ open: true, field })}
                      className="text-blue-500 hover:text-blue-600 cursor-pointer"
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>View History</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>

            {type === "text" && (
              <div className="w-full">
                <Textarea
                  {...methods.register(valueKey, {
                    required: `${label} is required`,
                  })}
                  value={metaData[valueKey]}
                  onChange={(e) =>
                    setMetaData({
                      ...metaData,
                      [valueKey]: e.target.value,
                    })
                  }
                  placeholder={placeholder}
                  className={`w-full h-40 border ${
                    methods.formState.errors[valueKey]
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg p-3`}
                />
                {methods.formState.errors[valueKey] && (
                  <p className="text-red-500 text-sm mt-1">
                    {methods.formState.errors[valueKey]?.message as string}
                  </p>
                )}
              </div>
            )}

            {type === "richtext" && (
              <RichTextEditor
                content={metaData[valueKey]}
                onChange={(content) =>
                  setMetaData({
                    ...metaData,
                    [valueKey]: content,
                  })
                }
              />
            )}
            {type === "keywords" && (
              <GlobalKeywordInput
                keywords={metaData?.[valueKey] || []}
                onChange={(newKeywords) =>
                  setMetaData({
                    ...metaData,
                    [valueKey]: newKeywords,
                  })
                }
              />
            )}
          </FormItem>
        );
      })}
    </>
  );
}
