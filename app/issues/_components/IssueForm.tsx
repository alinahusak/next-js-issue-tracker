"use client";
import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import ErrorMessage from "@/app/components/ErrorMessage";
import {Spinner} from "@/app/components";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { Issue } from "@prisma/client";
import { SimpleMdeReact } from "react-simplemde-editor";

type IssueFormData = z.infer<typeof issueSchema>;



const IssueForm = ({ issue }: { issue?: Issue }) => {
    
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: { title: issue?.title ?? "", description: issue?.description ?? "" },
  });

  const onSubmit = handleSubmit(async (data: IssueFormData) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError("An error occurred while creating the issue.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root variant="soft" color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field: { ref, ...field } }) => (
            <SimpleMdeReact placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type="submit" disabled={isSubmitting}>
            {issue ? "Update Issue" : "Submit New Issue"}
          {isSubmitting && <Spinner/>}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
