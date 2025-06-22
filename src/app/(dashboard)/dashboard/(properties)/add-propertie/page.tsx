"use client";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel } from "@/components/ui/form";
import React, { useState } from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import uploadImageToImageBB from "@/helper/ImageUpload/ImageUpload";
import toast from "react-hot-toast";

// import { IPropertyReq } from "@/redux/features/properties/propertiesType";
import { useHandleCreatePropertiesMutation } from "@/redux/features/properties/propertiesApi";
import { useRouter } from "next/navigation";
import { Plus, Trash2, X } from "lucide-react";
import Heading from "@/components/dashboard/shared/Heading";
import GlobalFieldRenderer from "@/components/dashboard/shared/GlobalFieldRenderer/GlobalFieldRenderer";
import { InputField } from "@/components/dashboard/inputs/InputState";
import { ImageUploader } from "@/components/dashboard/inputs/ImageInput";
import GlobalHistoryModal from "@/components/dashboard/shared/GlobalHistoryModal/GlobalHistoryModal";
import { GlobalAICommandInput } from "@/components/dashboard/inputs/GlobalAICommandInput/GlobalAICommandInput";

interface PropertyField {
  label: string;
  valueKey: string;
  placeholder: string;
  type: "text" | "richtext" | "keywords";
  formType: "string" | "array";
}

const propertyFieldConfig: PropertyField[] = [
  {
    label: "Name",
    valueKey: "name",
    placeholder: "Enter the name",
    type: "text",
    formType: "string",
  },
  {
    label: "Description",
    valueKey: "description",
    placeholder: "Enter the description",
    type: "richtext",
    formType: "string",
  },
];
const getInitialMetaData = () => {
  return propertyFieldConfig.reduce((acc, field) => {
    if (field.formType === "array") {
      acc[field.valueKey] = [];
    } else {
      acc[field.valueKey] = "";
    }
    return acc;
  }, {} as Record<string, any>);
};

const getInitialMetaDataHistory = () => {
  return propertyFieldConfig.reduce((acc, field) => {
    if (field.formType === "array") {
      acc[field.valueKey] = [[]];
    } else {
      acc[field.valueKey] = [];
    }
    return acc;
  }, {} as Record<string, any>);
};
const AddProperties = () => {
  const [propertiesImages, setPropertiesImages] = useState<File[]>([]);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
    const [Amenities, setAmenities] = useState<string[]>([]);
  const [metaData, setMetaData] = useState(getInitialMetaData);
  const [metaDataHistory, setMetaDataHistory] = useState(
    getInitialMetaDataHistory
  );
  const [historyModal, setHistoryModal] = useState<{
    open: boolean;
    field: any;
  }>({ open: false, field: null });

  const methods = useForm<any>({
    defaultValues: {
      details: [{ label: "", value: "" }],
    },
  });

  const router = useRouter();
  const { register, control, reset } = methods;
  const [handleAddProperties, { isLoading }] =
    useHandleCreatePropertiesMutation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (propertiesImages.length > 3 || propertiesImages.length < 3) {
      return toast.error("Please upload three images.");
    }

    setIsImageUploading(true);
    try {
      const imageURLs = (
        await Promise.all(
          propertiesImages.map((image) => uploadImageToImageBB(image))
        )
      ).filter((url: any): url is string => url !== null);

      if (imageURLs.length === 0) {
        setIsImageUploading(false);
        return toast.error("Failed to upload images.");
      }

      const payload = {
        ...data,
        name: metaData.name,
        description: metaData.description,
        image: imageURLs,
        // Convert numeric fields if needed
        details: data.details.map((detail: any) => ({
          label: detail.label,
          value: detail.value,
        })),
        amenities:Amenities
      };
console.log(payload);
      await handleAddProperties(payload).unwrap();
      toast.success("Property added successfully!");
      reset();
      router.push("/dashboard/manage-propertie");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.payload[0]?.message || "An error occurred");
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleAddKeyword = (e:any) => {
    const value = e.currentTarget.value.trim();
    if (e.key === "Enter" && value && !Amenities.includes(value)) {
      setAmenities((prev) => [...prev, value]);
      e.currentTarget.value = "";
    }
  };

  const handleRemoveKeyword = (kw:any) => {
    setAmenities((prev) => prev.filter((k) => k !== kw));
  };
  return (
    <div>
      <Heading
        title="Add Property"
        subTitle="Fill in the details below to add a new property."
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="pt-5 sm:pt-7 lg:pt-8 2xl:pt-10 lg:w-[60%] space-y-6"
        >
          <GlobalFieldRenderer
            FieldConfig={propertyFieldConfig}
            metaData={metaData}
            setMetaData={setMetaData}
            methods={methods}
            setHistoryModal={setHistoryModal}
            setMetaDataHistory={setMetaDataHistory}
            
          />

          <InputField
            name="location"
            label="Location"
            placeholder="Enter property location"
            validationRules={{ required: "Location is required" }}
          />

          <InputField
            name="price"
            label="Price"
            placeholder="Enter Price"
            validationRules={{ required: "Price is required" }}
          />

          {/* Dynamic Details Section */}
          <div className="space-y-4 ">
            <FormLabel>Property Details</FormLabel>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex justify-between gap-2 md:gap-0 items-end"
              >
                <InputField
                  name={`details.${index}.label`}
                  label="Label"
                  placeholder="e.g. Bedrooms, Size, etc."
                  validationRules={{ required: "Label is required" }}
                  inputStyle="2xl:w-[450px] "
                />
                <InputField
                  name={`details.${index}.value`}
                  label="Value"
                  placeholder="Enter value"
                  validationRules={{ required: "Value is required" }}
                  inputStyle="2xl:w-[450px] "
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 1}
                  className="mb-1"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ label: "", value: "" })}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Detail
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amenities
              </label>
              <div className="flex flex-wrap gap-2 p-3 bg-white border border-gray-300 rounded-md">
                {Amenities.map((kw, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {kw}
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(kw)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <textarea
                  rows={1}
                  placeholder="Type and press Enter"
                  onKeyUp={handleAddKeyword}
                  className="flex-grow focus:outline-none resize-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                />
              </div>
            </div>

            <FormItem>
              <FormLabel>Sale Type</FormLabel>
              <select
                {...register("sale")}
                className="form-select w-full p-2 border rounded-lg"
              >
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </FormItem>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <InputField
              name="bedrooms"
              label="Bedrooms"
              placeholder="Enter Bedrooms Number"
              validationRules={{ required: "bedrooms is required" }}
            />
            <InputField
              name="bathrooms"
              label="Bathrooms"
              placeholder="Enter Bathrooms Number"
              validationRules={{ required: "Bathrooms is required" }}
            />
            <InputField
              name="squareFeet"
              label="Square Feet"
              placeholder="Enter Square Feet"
              validationRules={{ required: "Square Feet is required" }}
            />
            <InputField
              name="parking"
              label="Parking"
              placeholder="Enter Parking Number"
              validationRules={{ required: "Parking is required" }}
            />
          </div>

          <div className="border-2 border-dashed border-white text-black rounded-lg">
            <FormItem>
              <FormLabel>Images</FormLabel>
              <ImageUploader
                images={propertiesImages}
                setImages={setPropertiesImages}
                mode="add"
                multiple={true}
              />
            </FormItem>
          </div>

          <Button
            type="submit"
            className={`rounded-none cursor-pointer ${
              isImageUploading || isLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={isImageUploading || isLoading}
          >
            {isImageUploading || isLoading ? "Please Wait..." : "Add Property"}
          </Button>
          <GlobalAICommandInput
            metaData={metaData}
            setMetaData={setMetaData}
            setMetaDataHistory={setMetaDataHistory}
            methods={methods}
            FieldConfig={propertyFieldConfig}
          />
        </form>
      </FormProvider>

      <GlobalHistoryModal
        historyModal={historyModal}
        metaData={metaData}
        metaDataHistory={metaDataHistory}
        setMetaData={setMetaData}
        setHistoryModal={setHistoryModal}
        methods={methods}
      />
    </div>
  );
};

export default AddProperties;
