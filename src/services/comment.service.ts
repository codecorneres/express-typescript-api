import prisma from "../utils/prisma";
import HttpException from "../utils/http-exception";

export const createComment = async (input: any) => {
    const body = input.body
    const user_id = input.user_id
    const issue_id = input.issue_id
    const project_id = input.project_id

    if (!body) {
        throw new HttpException(422, { errors: { body: ["can't be blank"] } });
    }
    if (!project_id) {
        throw new HttpException(422, { errors: { project_id: ["can't be blank"] } });
    }
    if (!issue_id) {
        throw new HttpException(422, { errors: { issue_id: ["can't be blank"] } });
    }
    if (!issue_id) {
        throw new HttpException(422, { errors: { issue_id: ["can't be blank"] } });
    }

    const comment = await prisma.comment.create({
        data: {
            body: body,
            user_id: user_id,
            issue_id: issue_id,
            project_id: project_id,
        },
        select: {
            body: true,
        },
    });
    return { ...comment };
};

export const getAllComments = async () => {
    const comments = await prisma.comment.findMany({
        select: {
            body: true,
        },
    });
    if (!comments) {
        throw new HttpException(404, "Comments not found");
    }

    return comments;
};

export const getCommentById = async (id: number) => {
    const comment = await prisma.comment.findUnique({
        where: {
            id: Number(id),
        },
        select: {
            body: true,
        },
    });

    if (!comment) {
        throw new HttpException(404, "Comment not found");
    }

    return comment;
};

export const updateComment = async (id: number, input: any) => {
    const body = input.body;

    if (!body) {
        throw new HttpException(422, { errors: { body: ["can't be blank"] } });
    }

    const comment = await prisma.comment.update({
        where: {
            id: Number(id),
        },
        data: {
            body: body,
        },
        select: {
            body: true,
        },
    });

    return comment;
}

export const deleteComment = async (id: number) => {
    const comment = await prisma.comment.delete({
        where: {
            id: Number(id),
        },
    });

    if (!comment) {
        throw new HttpException(404, "Cannot Delete Comment");
    }

    return comment;
}