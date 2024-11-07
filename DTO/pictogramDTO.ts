export type CreatePictogramDTO = {
  image: File;
  organizationId: number;
  pictogramName: string;
};

export type PictogramDTO = {
  id: number;
  organizationId: number;
  image: File;
  pictogramName: string;
};
