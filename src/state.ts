import { atom } from 'recoil'

export const SAlert = atom<string | null>({
    key: 'alert',
    default: null,
})

export const SFile = atom<File | null>({
    key: 'file',
    default: null,
})

export const SFileData = atom<any>({
    key: 'fileData',
    default: null,
})
