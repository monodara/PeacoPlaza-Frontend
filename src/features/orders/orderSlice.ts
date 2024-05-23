import createBaseSlice from "../../app/BaseSlice"
import { CategoryCreateDto, CategoryReadDto, CategoryUpdateDto } from "../categories/categoryDto"

const { slice, actions } = createBaseSlice<CategoryReadDto, CategoryCreateDto, CategoryUpdateDto>("categories", "/categories")

export const categoriesReducer = slice.reducer
export const categoriesActions = actions