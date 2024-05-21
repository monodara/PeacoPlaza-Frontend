import { BaseEntity } from "../../commonTypes/baseEntity";

export interface ProductImageReadDto extends BaseEntity {
    data: string;
}

export interface ProductImageCreateDto {
    data: string;
}

export interface ProductImageUpdateDto {
    data: string;
}