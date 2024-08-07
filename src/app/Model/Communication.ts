import { RelatedToProject } from "@app/Model/RelatedToCode";

export interface Communication {
    communicationId?: number;
    type?: string;
    date?: Date | string;
    details?: string;
    relatedTo?: RelatedToProject;
    relatedId?: Number;
    name?: string;
}