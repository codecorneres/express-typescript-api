import prisma from "../utils/prisma";
import HttpException from "../utils/http-exception";

export const createTimesheet = async (input: any) => {
    const user_id = input.user_id
    let startTime = input.startTime
    let endTime = input.endTime
    const project_id = input.project_id
    const issue_id = input.issue_id
    const time_in_minutes = input.time_in_minutes
    startTime = new Date(startTime);
    endTime = new Date(endTime)
    // const description = input.description

    const neededFields = [user_id, startTime, endTime, project_id, issue_id, time_in_minutes,]
    neededFields.forEach((field) => {
        if (!field) {
            throw new HttpException(422, { errors: { field: ["can't be blank"] } });
        }
    })

    const timesheet = await prisma.timesheet.create({
        data: {
            project_id,
            issue_id,
            user_id,
            time_in_minutes,
            startTime,
            endTime
        },
        select: {
            time_in_minutes: true,
            startTime: true,
            endTime: true
        }
    });
    return { ...timesheet };
};

export const getAllTimesheetsForIssue = async () => {
    const timesheets = await prisma.timesheet.findMany({

        select: {
            // description: true,
            time_in_minutes: true,
            startTime: true,
            endTime: true,
            user_id: true,
            issue_id: true,
            project_id: true,
            id: true
        }
    });
    if (!timesheets) {
        throw new HttpException(404, "Timesheets not found");
    }

    return timesheets;
}

export const getTimesheetById = async (id: number) => {
    const timesheet = await prisma.timesheet.findUnique({
        where: {
            id: Number(id),
        },
        select: {
            description: true,
            time_in_minutes: true,
        }
    });

    if (!timesheet) {
        throw new HttpException(404, "Timesheet not found");
    }

    return timesheet;
}

export const updateTimesheet = async (id: number, input: any) => {
    const description = input.description;
    const time_in_minutes = input.time_in_minutes;

    if(!time_in_minutes){
        throw new HttpException(422, { errors: { time_in_minutes: ["can't be blank"] } });
    }

    const timesheet = await prisma.timesheet.update({
        where: {
            id: Number(id),
        },
        data: {
            description: description,
            time_in_minutes: time_in_minutes,
        },
        select: {
            description: true,
            time_in_minutes: true,
        }
    });

    if (!timesheet) {
        throw new HttpException(404, "Timesheet not found");
    }

    return timesheet;
}

export const deleteTimesheet = async (id: number) => {
    const timesheet = await prisma.timesheet.delete({
        where: {
            id: Number(id),
        },
    });

    if (!timesheet) {
        throw new HttpException(404, "Timesheet was not deleted");
    }

    return timesheet;
}