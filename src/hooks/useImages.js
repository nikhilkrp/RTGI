
export const useImages = ()=>{
    return useInfiniteQuery({
        queryKey:["images"],
        queryfn:fetchImages,
        getNextPageParam:(lastPage, allPages)=>{
            if(lastPage.length===0){
                return undefined;
            }

            return allPages.length+1;
        }
    })
}