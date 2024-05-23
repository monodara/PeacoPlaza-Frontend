import { createAsyncThunk, createSlice, Draft, Slice, AnyAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { BaseEntity } from "../commonTypes/baseEntity";
import appAxios from "../features/shared/appAxios";

interface BaseState<T extends BaseEntity> {
    items: T[];
    loading: boolean;
    error?: string;
    selectedItem?: T;
}

export const createBaseSlice = <T extends BaseEntity, TCreateDto, TUpdateDto>(name: string, endpoint: string) => {
    const initialState: BaseState<T> = {
        items: [],
        loading: false,
    };

    const fetchAll = createAsyncThunk<T[], string>(
        `${name}/fetchAll`,
        async (urlSuffix, { rejectWithValue }) => {
            try {
                const response = await appAxios.get(`${endpoint}${urlSuffix}`);
                return response.data;
            } catch (e) {
                const error = e as AxiosError;
                return rejectWithValue(error.response?.data);
            }
        }
    );

    const createOne = createAsyncThunk<T, TCreateDto>(
        `${name}/createOne`,
        async (createDto, { rejectWithValue }) => {
            try {
                const response = await appAxios.post(endpoint, createDto);
                return response.data;
            } catch (e) {
                const error = e as AxiosError;
                return rejectWithValue(error.response?.data);
            }
        }
    );

    const updateOne = createAsyncThunk<boolean, { id: string; updateDto: TUpdateDto }>(
        `${name}/updateOne`,
        async ({ id, updateDto }, { rejectWithValue }) => {
            try {
                const response = await appAxios.post(`${endpoint}/${id}`, updateDto);
                return response.data;
            } catch (e) {
                const error = e as AxiosError;
                return rejectWithValue(error.response?.data);
            }
        }
    );

    const deleteOne = createAsyncThunk<boolean, { id: string }>(
        `${name}/deleteOne`,
        async (id, { rejectWithValue }) => {
            try {
                const response = await appAxios.delete(`${endpoint}/${id}`);
                return response.data;
            } catch (e) {
                const error = e as AxiosError;
                return rejectWithValue(error.response?.data);
            }
        }
    );

    const fetchById = createAsyncThunk<T, string>(
        `${name}/fetchById`,
        async (id, { rejectWithValue }) => {
            try {
                const response = await appAxios.get(`${endpoint}/${id}`);
                return response.data;
            } catch (e) {
                const error = e as AxiosError;
                return rejectWithValue(error.response?.data);
            }
        }
    );

    const extraReducers = (builder: any) => {
        // Fetch all
        builder.addCase(fetchAll.fulfilled, (state: Draft<BaseState<T>>, action: AnyAction) => {
            state.loading = false;
            state.error = undefined;
            state.items = action.payload as Draft<T>[]; // only happen with generics in redux TS
        });
        builder.addCase(fetchAll.pending, (state: Draft<BaseState<T>>) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(fetchAll.rejected, (state: Draft<BaseState<T>>, action: AnyAction) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Fetch by id
        builder.addCase(fetchById.fulfilled, (state: Draft<BaseState<T>>, action: AnyAction) => {
            state.loading = false;
            state.error = undefined;
            state.selectedItem = action.payload as Draft<T>;
        });
        builder.addCase(fetchById.pending, (state: Draft<BaseState<T>>) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(fetchById.rejected, (state: Draft<BaseState<T>>, action: AnyAction) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Create one
        builder.addCase(createOne.fulfilled, (state: Draft<BaseState<T>>, action: AnyAction) => {
            state.loading = false;
            state.error = undefined;
            // state.selectedItem = action.payload as Draft<T>;
            state.items.push(action.payload);
        });
        builder.addCase(createOne.pending, (state: Draft<BaseState<T>>) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(createOne.rejected, (state: Draft<BaseState<T>>, action: AnyAction) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    };

    const baseSlice = createSlice({
        name,
        initialState,
        reducers: {},
        extraReducers,
    });

    return {
        slice: baseSlice,
        actions: { fetchAll, fetchById, createOne, updateOne, deleteOne },
        extraReducers
    };
};

export default createBaseSlice;
export type { BaseState };
