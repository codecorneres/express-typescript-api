import prisma from '../utils/prisma';
import HttpException from '../utils/http-exception';

export const createProject = async (input: any) => {
    const title = input.body.title
    // const description = input.description
    const owner_id = input.body.owner_id
    // console.log(input, "the project input");

    if (!title) {
        throw new HttpException(422, { errors: { title: ["can't be blank"] } });
    }
    if (!owner_id) {
        throw new HttpException(422, { errors: { owner_id: ["can't be blank"] } });
    }

    const project = await prisma.project.create({
      data: {
        title,
        // description,
        owner_id,
      },
      include: {
        owner: true,

      }
    });

    return { ...project };
}

export const getAllProjects = async () => {
    const projects = await prisma.project.findMany({
      select: {
        title: true,
        description: true,
        owner_id: true,
        id: true
      }
    });

    if (!projects) {
        throw new HttpException(404, "Projects not found");
    }

    return projects;
};

export const getProjectById = async (id: number) => {
    const project = await prisma.project.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        title: true,
        description: true,
        owner_id: true,
        id: true,
        users: {
          select: {
            user_id: true,
            project_id: true,
          }
        },
        lists: {
          select: {
            id: true,
            title: true,
            project_id: true,
            user_id: true,
            issues: {
              select: {
                id: true,
                title: true,
                description: true,
                list_id: true,
                project_id: true,
                assigned_to: true,
                assigned_by: true,
                Comments: {
                  select: {
                    id: true,
                    body: true,
                    user_id: true,
                    issue_id: true,
                    project_id: true,
                  },
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
            }
          }
        },
      }
    });

    if(!project) {
        throw new HttpException(404, "Project not found");
    }
    return project;
};

export const updateProjectById = async (id: number, input: any) => {
    const project = await prisma.project.update({
      where: {
        id: Number(id),
      },
      data: {
        title: input.title,
        description: input.description,
        owner_id: input.owner_id
      },
      select: {
        title: true,
        description: true,
        owner_id: true,
        id: true
      }
    });

    if(!project) {
        throw new HttpException(404, "Project not found");
    }
    return project;
};

export const deleteProjectById = async (id: number) => {
    const project = await prisma.project.delete({
      where: {
        id: Number(id),
      },
      select: {
        title: true,
        description: true,
        owner_id: true,
        id: true
      }
    });

    if(!project) {
        throw new HttpException(404, "Project not found");
    }
    return project;
};