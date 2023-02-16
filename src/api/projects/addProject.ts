import getSupabase from "@/utils/Supabase";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_ID } from "./getProjects";

type AddProjectData = {
  name: string;
  client: string;
  image: Blob;
};

const addProject = async (data: AddProjectData) => {
  const supabase = getSupabase();

  const { client, image, name } = data;
  const { data: projectData } = await supabase
    .from("projects")
    .insert({ name, client })
    .select("*")
    .single();

  if (projectData) {
    const { data } = await supabase.storage
      .from("images")
      .upload(`/projects/${projectData.id}`, image);
    if (data) {
      const { data: project } = await supabase
        .from("projects")
        .update({ ...projectData, image_url: data.path })
        .eq("id", projectData.id)
        .select("*")
        .single();
      return project;
    }
  }

  return projectData;
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(addProject, {
    onSuccess: () => queryClient.invalidateQueries(QUERY_ID),
  });
  return mutation;
};

export type AddProjectResponse = Awaited<ReturnType<typeof addProject>>;
