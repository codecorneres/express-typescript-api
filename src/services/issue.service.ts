import prisma from '../utils/prisma';
import HttpException from '../utils/http-exception';

export const createIssue = async (input: any) => {
    const title = input.issueData.title;
    const list_id = input.issueData.list_id
    const project_id = input.issueData.project_id
    const assigned_to = input.issueData.assigned_to
    const assigned_by = input.issueData.assigned_by
    // const description = input.issueData.description;
    // const estimate = input.estimate
    // const issue_number = input.issue_number
    // const status_id = input.status_id

    const showError = [title, list_id, assigned_by, assigned_to, project_id];
    showError.forEach((item, index) => {
        if (!item) {
            throw new HttpException(422, { errors: { item: ["can't be blank"] } });
        }
    });

    const issue = await prisma.issue.create({
      data: {
        title,
        list_id,
        // description,
        project_id,
        assigned_by,
        assigned_to
      },
      select: {
        title: true,
        description: true,
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
        assigned_to: true,
        assigned_by: true,
        Comments: {
          select: {
            body: true,
            user_id: true,
            issue_id: true,
            project_id: true,
            id: true
          }
        },
        Attachments: {
          select: {
            id: true,
            path: true,
            user_id: true,
            issue_id: true,
            project_id: true,
          }
        },
        Timesheets: {
          select: {
            id: true,
            user_id: true,
            issue_id: true,
            project_id: true,
            time_in_minutes: true,
            startTime: true,
            endTime: true,  
            description: true,
          }
        }
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
        assigned_to: true,
        assigned_by: true,
        Comments: {
          select: {
            body: true,
            user_id: true,
            issue_id: true,
            project_id: true,
            id: true
          }
        },
        Attachments: {
          select: {
            id: true,
            path: true,
            user_id: true,
            issue_id: true,
            project_id: true,
          }
        },
        Timesheets: {
          select: {
            id: true,
            user_id: true,
            issue_id: true,
            project_id: true,
            time_in_minutes: true,
            startTime: true,
            endTime: true,  
            description: true,
          }
        }
      }
    });

    if (!issue) {
        throw new HttpException(404, "Issue not found");
    }

    return issue;
}

export const updateIssue = async (id: number, input: any) => {
    
    const title = input.title
    const description = input.description
    const project_id = input.project_id
    const assigned_to = input.assigned_to
    const assigned_by = input.assigned_by
    const list_id = input.list_id
        // const estimate = input.estimate
    // const issue_number = input.issue_number

    const issue = await prisma.issue.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        project_id,
        list_id,
        description,
        assigned_to,
        assigned_by
      },
      select: {
        title: true,
        description: true,
        project_id: true,
        estimate: true,
        issue_number: true,
        id: true,
        list_id: true,
        assigned_to: true,
        assigned_by: true,
        Comments: {
          select: {
            body: true,
            user_id: true,
            issue_id: true,
            project_id: true,
            id: true
          }
        },
        Attachments: {
          select: {
            id: true,
            path: true,
            user_id: true,
            issue_id: true,
            project_id: true,
          }
        },
        Timesheets: {
          select: {
            id: true,
            user_id: true,
            issue_id: true,
            project_id: true,
            time_in_minutes: true,
            startTime: true,
            endTime: true,  
            description: true,
          }
        }
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
        project_id: true
      }
    });

    if (!issue) {
        throw new HttpException(404, "Issue not found");
    }

    return issue;
}