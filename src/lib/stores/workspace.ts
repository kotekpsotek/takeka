import { writable } from "svelte/store";

interface Workspace {
    id: string
    name: string
    imageUrl: string
    ownerUserId: string
}

export const selectedWorkspace = (() => {
    const { ...all } = writable<Workspace | undefined>(undefined);
    const LOCAL_STORAGE_KEYNAME = "selectedWorkspace";

    return {
        ...all,
        readFromStore() {

        },
        set(workspace: Workspace | undefined) {
            // Operates on localStorage
            if (workspace) {
                localStorage.setItem(LOCAL_STORAGE_KEYNAME, JSON.stringify(workspace, null, 4));
            }
            else localStorage.removeItem(LOCAL_STORAGE_KEYNAME);

            // 
            all.set(workspace);
        }
    }
})();
