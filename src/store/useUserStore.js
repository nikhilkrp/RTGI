import {create} from "zustand"
import {persist} from "zustand/middleware"

export const useUserStore = create(
    persist(
        (set)=>({
            userId:crypto.randomUUID(),
            username:`User-${Math.floor(Math.random() * 1000)}`,
            activeImage:null,
            setActiveImage:(image)=>set({activeImage:image}),
        }),
        {
            name:"user-storage",
            partialize:(state)=>({userId:state.userId, username:state.username})
        }
    )
);