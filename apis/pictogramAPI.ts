import { CreatePictogramDTO, PictogramDTO } from "../DTO/pictogramDTO";
import { BASE_URL } from "../utils/globals";

// Placeholder for creating pictogram, if needed in the future
export const createPictogramRequest = async (data: CreatePictogramDTO) => {
  const Data = new FormData();
  Data.append("Image", data.image);
  Data.append("OrganizationId", data.organizationId.toString());
  Data.append("PictogramName", data.pictogramName);

  const res = await fetch(`${BASE_URL}/pictograms/`, {
    method: "POST",
    body: Data,
  });

  if (!res.ok) throw new Error("Fejl: Kunne ikke oprette piktogram");
  return await res.json();
};

// Fetch single pictogram by ID
export const fetchPictogramRequest = async (Id: number) => {
  const res = await fetch(`${BASE_URL}/pictograms/${Id}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Fejl: Kunne ikke hente piktogram");
  return await res.json();
};

// Fetch all pictograms from an organization
export const fetchPictogramsByOrganizationRequest = async (orgId: number) => {
  const res = await fetch(`${BASE_URL}/pictograms/organizationId${orgId}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Fejl: Kunne ikke hente piktogrammer");
  return await res.json();
};

// Delete pictogram by ID
export const deletePictogramRequest = async (Id: number) => {
  const res = await fetch(`${BASE_URL}/pictograms/${Id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Fejl: Kunne ikke slette piktogram");
};
