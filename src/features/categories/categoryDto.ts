import { BaseEntity } from "../../commonTypes/baseEntity";

export interface CategoryReadDto extends BaseEntity {
    name: string;
    image: string;
    parentCategoryId?: string;
}

export interface CategoryCreateDto {
    name: string;
    image: string;
    parentCategoryId?: string;
}

export interface CategoryUpdateDto {
    name: string;
    image: string;
    parentCategoryId: string | null;
}