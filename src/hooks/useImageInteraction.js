import { id } from "@instantdb/react";
import { db } from "../api/instantdb";
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

            },
        },

    },

);

    const reactions = data?.reactions || [];
    const comments = data?.comments || [];

    const hasUserLiked = reactions.some(
        (reaction) => reaction.userId === userId
    );

const reactionCounts = reactions.reduce((acc, r) => {
  acc[r.type] = (acc[r.type] || 0) + 1;
  return acc;
}, {});


    const likeCount = reactions.length;

    const toggleLike = async (reactionType = "heart") => {
        const existingReaction = reactions.find(
            (reaction) =>
                reaction.userId === userId &&
                reaction.type === reactionType
        );

        if (existingReaction) {
            await db.transact(
                db.tx.reactions[existingReaction.id].delete()
            );
        } else {
            await db.transact([
                db.tx.reactions[id()].update({
                    imageId,
                    userId,
                    type: reactionType,
                    createdAt: Date.now(),
                }),
                db.tx.feed[id()].update({
                    type: "reaction",
                    reactionType: reactionType,
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
        reactionCounts,
        comments,
        likeCount,
        hasUserLiked,
        toggleLike,
        addComment,
        isLoading,
        error,
    };
};
