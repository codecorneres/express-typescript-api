import prisma from '../utils/prisma';
import HttpException from '../utils/http-exception';

export const createIssue = async (input: any) => {
    const title = input.title;
    // const description = input.description;
    const project_id = input.project_id
    const list_id = input.list_id
    // const estimate = input.estimate
    // const issue_number = input.issue_number
    // const assigned_to = input.assigned_to
    // const assigned_by = input.assigned_by
    // const status_id = input.status_id

    // const showError = [title, estimate, status_id, assigned_by, assigned_to, issue_number];
    // showError.forEach((item, index) => {
    //     if (!item) {
    //         throw new HttpException(422, { errors: { item: ["can't be blank"] } });
    //     }
    // });
    if (!title) {
      throw new HttpException(422, { errors: { title: ["can't be blank"] } });
    }

    const issue = await prisma.issue.create({
      data: {
        title,
        project_id,
        list_id
      },
      select: {
        title: true,
        // description: true,
        project_id: true,
        list_id: true,
        // estimate: true,
        // issue_number: true
      }
    });
    return { ...issue };
}

export const getAllIssues = async () => {
    const issues = await prisma.issue.findMany({
      select: {
        title: true,
        description: true,
        project_id: true,
        estimate: true,
        issue_number: true,
        id: true, 
        list_id: true,
      }
    });

    if (!issues) {
        throw new HttpException(404, "Issues not found");
    }

    return issues;
}

export const getIssueById = async (id: number) => {
    const issue = await prisma.issue.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        title: true,
        description: true,
        project_id: true,
        estimate: true,
        issue_number: true,
        id: true,
        list_id: true,
      }
    });

    if (!issue) {
        throw new HttpException(404, "Issue not found");
    }

    return issue;
}

export const updateIssue = async (id: number, input: any) => {
    
    const title = input.title
    // const description = input.description
    const project_id = input.project_id
    // const estimate = input.estimate
    // const issue_number = input.issue_number
    const list_id = input.list_id

    const issue = await prisma.issue.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        project_id,
        list_id
      },
      select: {
        title: true,
        description: true,
        project_id: true,
        estimate: true,
        issue_number: true,
        id: true,
        list_id: true,
      }
    });

    if (!issue) {
        throw new HttpException(404, "Issue not found");
    }

    return issue;
}

export const deleteIssue = async (id: number) => {
    const issue = await prisma.issue.delete({
      where: {
        id: Number(id),
      },
      select: {
        title: true,
        description: true,
      }
    });

    if (!issue) {
        throw new HttpException(404, "Issue not found");
    }

    return issue;
}