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
import { Plus, Trash2 } from "lucide-react";
import RichTextEditor from "@/components/editor";
import Heading from "@/components/dashboard/shared/Heading";
import { InputField } from "@/components/dashboard/inputs/InputState";
import { ImageUploader } from "@/components/dashboard/inputs/ImageInput";

const AddProperties = () => {
  const [propertiesImages, setPropertiesImages] = useState<File[]>([]);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [post, setPost] = useState<string>("");
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
  const onChange = (content: string) => {
    setPost(content);
    console.log(content);
  };
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
        description: post,
        image: imageURLs,
        // Convert numeric fields if needed
        details: data.details.map((detail: any) => ({
          label: detail.label,
          value: detail.value,
        })),
      };

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
          <InputField
            name="name"
            label="Property Name"
            placeholder="Enter property name"
            validationRules={{ required: "Name is required" }}
          />

          <InputField
            name="location"
            label="Location"
            placeholder="Enter property location"
            validationRules={{ required: "Location is required" }}
          />

          <div>
            <FormLabel className="mb-2">Description</FormLabel>
            <div className="rounded-xs">
              <RichTextEditor content={post} onChange={onChange} />
            </div>
          </div>
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
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <select
                {...register("type")}
                className="form-select w-full p-2 border"
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="duplex">Duplex</option>
                <option value="triplex">Triplex</option>
                <option value="loft">Loft</option>
                <option value="studio">Studio</option>
                <option value="villa">Villa</option>
                <option value="bungalow">Bungalow</option>
                <option value="cottage">Cottage</option>
                <option value="manufactured">Manufactured</option>
                <option value="mobile home">Mobile Home</option>
                <option value="co-op">Co-op</option>
                <option value="farm">Farm</option>
                <option value="land">Land</option>
                <option value="lot">Lot</option>
                <option value="multi-family">Multi-family</option>
                <option value="single-family">Single-family</option>
                <option value="commercial">Commercial</option>
                <option value="warehouse">Warehouse</option>
                <option value="office">Office</option>
                <option value="industrial">Industrial</option>
                <option value="retail">Retail</option>
                <option value="mixed-use">Mixed-use</option>
              </select>
            </FormItem>

            <FormItem>
              <FormLabel>Sale Type</FormLabel>
              <select
                {...register("sale")}
                className="form-select w-full p-2 border"
              >
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </FormItem>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          </div>
          <InputField
            name="video"
            label="Video URL (Optional)"
            type="url"
            placeholder="https://example.com/tour.mp4"
            validationRules={{
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Please enter a valid URL",
              },
            }}
          />
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
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProperties;
