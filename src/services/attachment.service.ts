import prisma from "../utils/prisma";
import HttpException from "../utils/http-exception";

export const createAttachment = async (input: any) => {
    const path = input.path
    const issue_id = input.issue_id
    const project_id = input.project_id
    const user_id = input.user_id

    let showError = [path, issue_id, project_id, user_id]
    showError.forEach((item, index) => {
        if (!item) {
            throw new HttpException(422, { errors: { item: ["can't be blank"] } });
        }
    })

    const attachment = await prisma.attachment.create({
        data: {
            path: path,
            issue_id: issue_id,
            project_id: project_id,
            user_id: user_id,
        },
        select: {
            path: true,
            user_id: true,
        },
    });
    return { ...attachment };
}

export const getAllAttachments = async () => {
    const attachments = await prisma.attachment.findMany({
        select: {
            path: true,
            user_id: true,
        },
    });
    if (!attachments) {
        throw new HttpException(404, "Attachments not found");
    }

    return attachments;
};

export const getAttachmentById = async (id: number) => {
    const attachment = await prisma.attachment.findUnique({
        where: {
            id: Number(id),
        },
        select: {
            path: true,
            user_id: true,
        },
    });

    if (!attachment) {
        throw new HttpException(404, "Attachment not found");
    }
    return attachment;
};

export const updateAttachment = async (id: number, input: any) => {
    const path = input.path
    const issue_id = input.issue_id
    const project_id = input.project_id
    const user_id = input.user_id

    let showError = [path, issue_id, project_id, user_id]
    showError.forEach((item, index) => {
        if (!item) {
            throw new HttpException(422, { errors: { item: ["can't be blank"] } });
        }
    })

    const attachment = await prisma.attachment.update({
        where: {
            id: Number(id),
        },
        data: {
            path: path,
            issue_id: issue_id,
            project_id: project_id,
            user_id: user_id,
        },
        select: {
            path: true,
            user_id: true,
        },
    });
    return { ...attachment };
};

export const deleteAttachment = async (id: number) => {
    const attachment = await prisma.attachment.delete({
        where: {
            id: Number(id),
        },
    });

    if (!attachment) {
        throw new HttpException(404, "Attachment was not deleted");
    }
    return attachment;
};