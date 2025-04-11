"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import { toast } from "sonner";
import { updateUser } from "@/actions/user.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  imageUrl: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
});

const UpdateUserDialog = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      imageUrl: "",
    },
  });

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) throw new Error("Cloudinary cloud name not configured");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round((event.loaded * 100) / event.total);
              setUploadProgress(percent);
            }
          },
        }
      );

      const secureUrl = res.data.secure_url;
      setImageUrl(secureUrl);
      setPreviewUrl(secureUrl);
      form.setValue("imageUrl", secureUrl);
      toast("Image uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      if (imageUrl || values.imageUrl) {
        formData.append("image", imageUrl || values.imageUrl!);
      }

      const response = await updateUser(formData);

      if (response.success) {
        toast("Profile updated successfully!");
        form.reset();
        setImageUrl("");
        setPreviewUrl("");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-transparent rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#62F6B5] font-semibold text-sm sm:text-base">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter new username"
                    {...field}
                    className="text-sm sm:text-base"
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel className="text-[#62F6B5] font-semibold text-sm sm:text-base">
              Profile Picture
            </FormLabel>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploading}
              className="file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-muted file:text-muted-foreground hover:file:bg-muted/80 disabled:opacity-50 w-full"
            />
            {uploading && <Progress value={uploadProgress} className="h-2" />}
          </div>

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#62F6B5] font-semibold text-sm sm:text-base">
                  Or Image URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setPreviewUrl(e.target.value);
                      setImageUrl("");
                    }}
                    disabled={uploading}
                    className="text-sm sm:text-base"
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          {previewUrl && (
            <div className="mt-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="rounded-md w-full h-auto max-h-40 sm:max-h-48 object-cover"
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-[#62F6B5] text-gray-800 text-sm sm:text-base py-2 sm:py-2.5"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Profile"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateUserDialog;