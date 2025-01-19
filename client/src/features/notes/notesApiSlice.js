import { apiSlice } from '../../app/api/apiSlice'
import { createEntityAdapter } from '@reduxjs/toolkit'

const notesAdapter = createEntityAdapter()
const initialState = notesAdapter.getInitialState()

export const noteApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserNotes: builder.query({
            query: (userId) => `/users/${userId}`,
            transformResponse: responseData => {
                const loadedData = responseData.map(note => {
                    note.id = note._id
                    return note
                })
                return notesAdapter.setAll(initialState, loadedData)
            },
            providesTags: (result, err, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Note', id }))
                    ]
                } else return [{ type: 'Note', id: 'LIST' }]
            }
        }),
        postNewNote: builder.mutation({
            query: (props) => ({
                url: '/notes',
                method: 'POST',
                body: { ...props }
            }),
            invalidatesTags: [{ type: 'Note', id: 'LIST' }]
        }),
        deleteNote: builder.mutation({
            query: ({ noteId, userId }) => ({
                url: `/notes`,
                method: 'DELETE',
                body: { noteId }
            }),
            invalidatesTags: (result, err, arg) => [{ type: 'Note', id: arg.noteId }],
            async onQueryStarted({ noteId, userId }, { dispatch, queryFulfilled }) {
                // Optimistically remove the note from the cache
                const patchResult = dispatch(
                    noteApiSlice.util.updateQueryData('getUserNotes', userId, (draft) => {
                        delete draft.entities[noteId];
                        draft.ids = draft.ids.filter(id => id !== noteId);
                    })
                );

                try {
                    await queryFulfilled; // Wait for the mutation to complete
                } catch {
                    patchResult.undo(); // Undo the optimistic update if it fails
                }
            },
        }),
        patchNote: builder.mutation({
            query: (props) => {
                return ({
                    url: '/notes',
                    method: 'PATCH',
                    body: { ...props }
                })
            },
            invalidatesTags: (result, err, arg) => [{ type: 'Note', id: arg.noteId }]
        }),

    })
})

export const { useGetUserNotesQuery, usePostNewNoteMutation, useDeleteNoteMutation, usePatchNoteMutation } = noteApiSlice