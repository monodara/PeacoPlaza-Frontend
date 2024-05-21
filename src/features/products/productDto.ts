import { BaseEntity } from "../../commonTypes/baseEntity";
import { CategoryReadDto } from "../categories/categoryDto";
import { ProductImageCreateDto, ProductImageReadDto } from "../productImages/productImageDto";

export interface ProductReadDto extends BaseEntity {
    title: string;
    price: number;
    description: string;
    productImages: ProductImageReadDto[];
    inventory: number;
    weight: number;
    category: CategoryReadDto;
}

export interface ProductCreateDto {
    title: string;
    price: number;
    description: string;
    inventory: number;
    weight: number;
    categoryId: string;
}

export interface ProductUpdateDto {
    title: string;
    price: number;
    description: string;
    images: ProductImageCreateDto[] | null;
    inventory: number;
    weight: number;
    categoryId: string;
}