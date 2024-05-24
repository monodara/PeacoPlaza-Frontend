import createBaseSlice from "../../app/BaseSlice"
import { AddressCreateDto, AddressReadDto, AddressUpdateDto } from "./addressDto"

const { slice, actions } = createBaseSlice<AddressReadDto, AddressCreateDto, AddressUpdateDto>("addresses", "/addresses")

export const addressesReducer = slice.reducer
export const addressesActions = actions