import { db, id } from "@instantdb/react";
import { useUserStore } from "../store/useUserStore";

export const useImageInteractions = (imageId) => {
    const { userId } = useUserStore();

    const { isLoading, error, data } = db.useQuery({
        reactions: {
            $: {
                where: { imageId },
            },
        },
        comments: {
            $: {
                where: { imageId },
                order: { createdAt: "asc" },
            },
        },
    });

    const reactions = data?.reactions || [];
    const comments = data?.comments || [];

    const hasUserLiked = reactions.some(
        (reaction) => reaction.userId === userId
    );

    const likeCount = reactions.length;

    const toggleLike = async () => {
        const existingLike = reactions.find(
            (reaction) => reaction.userId === userId
        );

        if (existingLike) {
            await db.transact(
                db.tx.reactions[existingLike.id].delete()
            );
        } else {
            await db.transact([
                db.tx.reactions[id()].update({
                    imageId,
                    userId,
                    type: "heart",
                    createdAt: Date.now(),
                }),
                db.tx.feed[id()].update({
                    type: "reaction",
                    imageId,
                    userId,
                    createdAt: Date.now(),
                }),
            ]);
        }
    };

    const addComment = async (text) => {
        if (!text.trim()) return;

        await db.transact([
            db.tx.comments[id()].update({
                imageId,
                userId,
                text,
                createdAt: Date.now(),
            }),
            db.tx.feed[id()].update({
                type: "comment",
                imageId,
                userId,
                createdAt: Date.now(),
            }),
        ]);
    };

    return {
        reactions,
        comments,
        likeCount,
        hasUserLiked,
        toggleLike,
        addComment,
        isLoading,
        error,
    };
};
