import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios';

// Fetch Full Overview for Courses Page (Action 1)
export const fetchUserCourses = createAsyncThunk(
    'course/fetchUserCourses',
    async ({ packageId = null } = {}, { rejectWithValue }) => {
        try {
            const params = packageId ? { packageId } : {};
            const response = await api.get('/courses', { params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses overview');
        }
    }
);

// Fetch EBook Reader Details & Table of Contents (Action 2)
export const fetchEBookReaderDetails = createAsyncThunk(
    'course/fetchEBookReaderDetails',
    async ({ ebookId, chapterId = null }, { rejectWithValue }) => {
        try {
            const params = chapterId ? { chapterId } : {};
            const response = await api.get(`/courses/reader/${ebookId}`, { params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch eBook reader details');
        }
    }
);

// Save / Sync User Reading & Audio Progress (Action 3)
export const saveUserCourseProgress = createAsyncThunk(
    'course/saveUserCourseProgress',
    async ({ ebookId, currentPage, lastChapterId, isBookmarked, audioPositionSeconds, status }, { rejectWithValue }) => {
        try {
            const response = await api.post('/courses/progress', {
                ebookId,
                currentPage,
                lastChapterId,
                isBookmarked,
                audioPositionSeconds,
                status
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to save progress');
        }
    }
);

// Fetch Chapter Audio Details (Action 4)
export const fetchChapterAudio = createAsyncThunk(
    'course/fetchChapterAudio',
    async ({ chapterId = null, ebookId = null } = {}, { rejectWithValue }) => {
        try {
            const params = {
                chapterId: chapterId || undefined,
                ebookId: ebookId || undefined
            };
            const response = await api.get('/courses/audio', { params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch audio track');
        }
    }
);

const initialState = {
    packages: [],
    ebooks: [],
    curriculum: [],
    selectedPackageId: 1,
    readerEBook: null,
    readerChapters: [],
    activeChapter: null,
    activeAudio: null,
    loading: false,
    readerLoading: false,
    error: null,
    progressSaving: false
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setSelectedPackageId: (state, action) => {
            state.selectedPackageId = action.payload;
        },
        setActiveChapter: (state, action) => {
            const chapter = action.payload;
            state.activeChapter = chapter;
            if (chapter) {
                state.readerChapters = state.readerChapters.map(ch => ({
                    ...ch,
                    isCurrentActive: ch.id === chapter.id || ch.chapterId === chapter.id
                }));
            }
        },
        clearReaderState: (state) => {
            state.readerEBook = null;
            state.readerChapters = [];
            state.activeChapter = null;
        },
        updateLocalProgress: (state, action) => {
            const { ebookId, currentPage, isBookmarked, audioPositionSeconds, status } = action.payload;
            if (state.readerEBook && (state.readerEBook.ebookId === ebookId || state.readerEBook.id === ebookId)) {
                if (currentPage !== undefined) state.readerEBook.currentPage = currentPage;
                if (isBookmarked !== undefined) state.readerEBook.isBookmarked = isBookmarked;
                if (audioPositionSeconds !== undefined) state.readerEBook.audioPositionSeconds = audioPositionSeconds;
                if (status !== undefined) state.readerEBook.status = status;
            }
            // Also update in eBooks array
            state.ebooks = state.ebooks.map(eb => {
                if (eb.ebookId === ebookId || eb.id === `eb-${ebookId}`) {
                    return {
                        ...eb,
                        currentPage: currentPage !== undefined ? currentPage : eb.currentPage,
                        isBookmarked: isBookmarked !== undefined ? isBookmarked : eb.isBookmarked,
                        audioPositionSeconds: audioPositionSeconds !== undefined ? audioPositionSeconds : eb.audioPositionSeconds,
                        status: status !== undefined ? status : eb.status
                    };
                }
                return eb;
            });
        }
    },
    extraReducers: (builder) => {
        // fetchUserCourses
        builder
            .addCase(fetchUserCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.packages = action.payload.packages || [];
                state.ebooks = action.payload.ebooks || [];
                state.curriculum = action.payload.curriculum || [];
                if (state.packages.length > 0) {
                    const exists = state.packages.some(p => p.id === state.selectedPackageId || p.packageId === state.selectedPackageId);
                    if (!exists) {
                        state.selectedPackageId = state.packages[0].id || state.packages[0].packageId;
                    }
                }
            })
            .addCase(fetchUserCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // fetchEBookReaderDetails
        builder
            .addCase(fetchEBookReaderDetails.pending, (state) => {
                state.readerLoading = true;
                state.error = null;
            })
            .addCase(fetchEBookReaderDetails.fulfilled, (state, action) => {
                state.readerLoading = false;
                state.readerEBook = action.payload.ebook || null;
                state.readerChapters = action.payload.chapters || [];
                state.activeChapter = action.payload.activeChapter || null;
            })
            .addCase(fetchEBookReaderDetails.rejected, (state, action) => {
                state.readerLoading = false;
                state.error = action.payload;
            });

        // saveUserCourseProgress
        builder
            .addCase(saveUserCourseProgress.pending, (state) => {
                state.progressSaving = true;
            })
            .addCase(saveUserCourseProgress.fulfilled, (state) => {
                state.progressSaving = false;
            })
            .addCase(saveUserCourseProgress.rejected, (state) => {
                state.progressSaving = false;
            });

        // fetchChapterAudio
        builder
            .addCase(fetchChapterAudio.fulfilled, (state, action) => {
                state.activeAudio = action.payload.audio || null;
            });
    }
});

export const {
    setSelectedPackageId,
    setActiveChapter,
    clearReaderState,
    updateLocalProgress
} = courseSlice.actions;

export default courseSlice.reducer;
