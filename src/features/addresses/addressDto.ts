import { BaseEntity } from "../../commonTypes/baseEntity";

export interface AddressReadDto extends BaseEntity {
    id: string;
    addressLine: string;
    street: string;
    city: string;
    country: string;
    postcode: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    landmark: string;
    userId: string;
}

export interface AddressCreateDto {
    addressLine: string;
    street: string;
    city: string;
    country: string;
    postcode: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    landmark: string;
}

export interface AddressUpdateDto {
    addressLine: string;
    street: string;
    city: string;
    country: string;
    postcode: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    landmark: string;
}