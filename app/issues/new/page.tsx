"use client";
import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";

type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
    defaultValues: { title: "", description: "" },
  });

  const onSubmit = async (data: IssueForm) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An error occurred while creating the issue.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root variant="soft" color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type="submit" disabled={isSubmitting}>
            Submit New Issue
          {isSubmitting && <Spinner/>}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
