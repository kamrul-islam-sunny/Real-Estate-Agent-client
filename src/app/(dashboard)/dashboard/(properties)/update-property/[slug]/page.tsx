"use client";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel } from "@/components/ui/form";
;
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import uploadImageToImageBB from "@/helper/ImageUpload/ImageUpload";
import {
  useHandleFindSinglePropertiesQuery,
  useHandleUpdatePropertiesMutation,
} from "@/redux/features/properties/propertiesApi";

import RichTextEditor from "@/components/editor";
import { InputField } from "@/components/dashboard/inputs/InputState";
import { ImageUpdateUploader } from "@/components/dashboard/inputs/ImageUpdateInput";
import Heading from "@/components/dashboard/shared/Heading";

interface PropertyFormData {
  name?: string;
  location: string;
  description: string;
  price: string;
  details: {
    label: string;
    value: string;
  }[];
  type?: string;
  sale?: string;
  bedrooms?: string;
  bathrooms?: string;
  squareFeet?: string;
  video?: string;
}

const UpdateProperty: React.FC<{ params: Promise<any> }> = ({ params }) => {
  const [slug, setSlug] = useState<string>("");
  const [removedDefaultImageUrls, setRemovedDefaultImageUrls] = useState<
    string[]
  >([]);
  const handleRemoveDefaultImage = (url: string) => {
    setRemovedDefaultImageUrls((prev) => [...prev, url]);
  };

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);
  const router = useRouter();
  const [propertiesImages, setPropertiesImages] = useState<File[]>([]);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const { data: property, isLoading } =
    useHandleFindSinglePropertiesQuery(slug);
  const [handleUpdateProperties] = useHandleUpdatePropertiesMutation();
  console.log(property?.payload.data.name);
  const [post, setPost] = useState<string>("");
  const methods = useForm<PropertyFormData>({
    defaultValues: {
      details: [{ label: "", value: "" }],
    },
  });
  const { register, control, reset, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  useEffect(() => {
    if (property) {
      reset({
        name: property.payload.data.name || "",
        description: property.payload.data.description || "",
        location: property.payload.data.location || "",
        price: property.payload.data.price || "",
        type: property.payload.data.type || "",
        sale: property.payload.data.sale || "",
        bedrooms: property.payload.data.bedrooms || "",
        bathrooms: property.payload.data.bathrooms || "",
        squareFeet: property.payload.data.squareFeet || "",
        video: property.payload.data.video || "",
        details: property.payload.data.details || [{ label: "", value: "" }],
      });
      setPost(property.payload.data.description || "");
    }
  }, [property, reset]);
  const onChange = (content: string) => {
    setPost(content);
    console.log(content);
  };
  const onSubmit = async (data: PropertyFormData) => {
    try {
      setIsImageUploading(true);
      const remainingDefaultImages = (
        property?.payload.data.image || []
      ).filter((url: any) => !removedDefaultImageUrls.includes(url));
      let imageURLs = [...remainingDefaultImages];
      if (propertiesImages.length > 0) {
        const uploadedImages = await Promise.all(
          propertiesImages.map((image) => uploadImageToImageBB(image))
        );
        imageURLs = [
          ...imageURLs,
          ...(uploadedImages.filter((url) => url !== null) as string[]),
        ];
      }

      if (imageURLs.length === 0) {
        throw new Error("At least one image is required");
      }

      const payload = {
        ...data,
        description: post,
        image: imageURLs,
      };
      console.log(payload);

      // Update property
      await handleUpdateProperties({
        id: property?.payload?.data._id,
        payload,
      }).unwrap();

      toast.success("Property updated successfully!");
      router.push("/dashboard/manage-propertie");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.payload[0]?.message || "An error occurred");
    } finally {
      setIsImageUploading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div>
      <Heading
        title="Update Property"
        subTitle="Edit the property details below"
      />

      {/* Update Form */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="pt-5 sm:pt-7 lg:pt-8 2xl:pt-10 lg:w-[60%] space-y-6"
        >
          <InputField
            name="name"
            label="Property Name"
            placeholder="Enter property name"
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
          <div className="space-y-4">
            <FormLabel>Additional Details</FormLabel>
            {fields.map((field, index) => (
              <div key={field.id} className="flex justify-between gap-2 md:gap-0 items-end">
                <InputField
                  name={`details.${index}.label`}
                  label="Label"
                  placeholder="e.g. Amenities, Features"
                  inputStyle={"2xl:w-[450px]"}
                />
                <InputField
                  name={`details.${index}.value`}
                  label="Value"
                  placeholder="Enter value"
                  inputStyle={"2xl:w-[450px] "}
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
            />
            <InputField
              name="bathrooms"
              label="Bathrooms"
              placeholder="Enter Bathrooms Number"
            />
            <InputField
              name="squareFeet"
              label="Square Feet"
              placeholder="Enter Square Feet"
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

          <FormItem>
            <FormLabel>Images</FormLabel>

            <ImageUpdateUploader
              images={propertiesImages}
              setImages={setPropertiesImages}
              mode="update"
              multiple={true}
              defaultImages={property?.payload.data.image || []}
              onRemoveDefaultImage={handleRemoveDefaultImage} // Add this prop
            />
          </FormItem>

          <Button
            type="submit"
            className="rounded-none"
            disabled={isImageUploading}
          >
            {isImageUploading ? "Updating..." : "Update Property"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default UpdateProperty;
