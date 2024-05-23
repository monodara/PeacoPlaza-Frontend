import { BaseEntity } from "../../commonTypes/baseEntity";
import { AvatarReadDto } from "../avatars/avatarDto";

export interface UserReadDto extends BaseEntity {
    userName: string;
    email: string;
    role: string;
    defaultAddressId: string;
    avatar?: AvatarReadDto;
    joinedAt: string;
    // avater: string | null;
}

export interface UserUpdateDto {
    username: string;
}

export interface UserCreateDto {
    username: string;
    email: string;
    password: string;
}