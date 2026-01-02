

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchImages } from "../api/unsplash";
export const useImages = ()=>{
    return useInfiniteQuery({
        queryKey:["images"],
        queryFn:fetchImages,
        getNextPageParam:(lastPage, allPages)=>{
            if(lastPage.length===0){
                return undefined;
            }

            return allPages.length+1;
        }
    })
}