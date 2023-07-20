import prisma from '../utils/prisma';
import HttpException from '../utils/http-exception';

// creating a list
export const createList = async (input: any) => {
    const title = input.listData.title
    const project_id = input.listData.project_id
    const user_id = input.listData.user_id

    if (!title) {
        throw new HttpException(422, { errors: { title: ["can't be blank"] } });
    }
    if (!project_id) {
        throw new HttpException(422, { errors: { project_id: ["can't be blank"] } });
    }
    if (!user_id) {
        throw new HttpException(422, { errors: { user_id: ["can't be blank"] } });
    }

    const list = await prisma.lists.create({
      data: {
        title,
        // issue_id,
        project_id,
        user_id
      },
      select: {
        title: true,
        project_id: true,
        user_id: true,
        id: true,
        issues: {
          select: {
            id: true,
            title: true,
            description: true,
            Comments: {
              select: {
                id: true,
                body: true
              },
            },
          }
        }
      }
    })
    return list;
}

// get all lists
export const getAllLists = async () => {
    const lists = await prisma.lists.findMany({
      select: {
        title: true,
        project_id: true,
        user_id: true,
        id: true,
        issues: {
          select: {
            id: true,
            title: true,
            description: true,
            Comments: {
              select: {
                id: true,
                body: true
              },
            },
          }
        }
      }
    });

    if (!lists) {
        throw new HttpException(404, "Lists not found");
    }

    return lists;
}

// get list by id
export const getListById = async (id: number) => {
    const list = await prisma.lists.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        title: true,
        project_id: true,
        user_id: true,
        id: true,
        issues: {
          select: {
            id: true,
            title: true,
            description: true,
            Comments: {
              select: {
                id: true,
                body: true
              },
            },
          }
        }
      }
    });

    if(!list) {
        throw new HttpException(404, "List not found");
    }
    return list;
}

// get list by project id
export const getListByProjectId = async (id: number) => {
    const list = await prisma.lists.findMany({
      where: {
        project_id: Number(id),
      },
      select: {
        title: true,
        project_id: true,
        id: true
      }
    });

    if(!list) {
        throw new HttpException(404, "List not found");
    }
    return list;
}

// update list by id
export const updateListById = async (id: number, input: any) => {
    const title = input.title
    const project_id = input.project_id


    const list = await prisma.lists.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        project_id,
      },
      select: {
        title: true,
        project_id: true,
        id: true
      }
    });

    if(!list) {
        throw new HttpException(404, "List not found");
    }
    return list;
}

// delete list by id
export const deleteListById = async (id: number) => {
    const list = await prisma.lists.delete({
      where: {
        id: Number(id),
      },
      select: {
        title: true,
        project_id: true,
        id: true
      }
    });

    if(!list) {
        throw new HttpException(404, "List not found");
    }
    return list;
}

// delete list by project id
export const deleteListByProjectId = async (id: number) => {
    const list = await prisma.lists.deleteMany({
      where: {
        project_id: Number(id),
      }
    });

    if(!list) {
        throw new HttpException(404, "List not found");
    }
    return list;
}
