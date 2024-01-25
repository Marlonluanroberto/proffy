import { Request, Response } from 'express';

import db from '../Database/connection';
import convertYourToMinutes from '../utils/convertYourToMinutes';

interface ScheduleItem {
    week_day: Number,
    from: string,
    to: string
}

export default class ClassesController {

    async index(request: Request, response: Response) {
        const filters = request.query;
        const week_day = filters.week_day  as string;
        const subject = filters.subject as string;
        const time = filters.time as string;


        console.log(week_day , subject , time);
        
        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: "Missing filters to search classes"
            });
        }

        const timeInMinutes = convertYourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function (){
                this.select('classes_schedule.*')
                    .from('classes_schedule')
                    .whereRaw('`classes_schedule` . `class_id`  = `classes` . `id`')
                    .whereRaw('`classes_schedule` . `week_day` = ??', [Number (week_day )])
                    .whereRaw('`classes_schedule` . `from` <= ??', [timeInMinutes])
                    .whereRaw('`classes_schedule` . `to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=' , 'users.id')
            .select(['classes.*', 'users.*']);
console.log(classes);
        response.json(classes);
    }


    async create(request: Request, response: Response) {

        const { name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule,
        } = request.body;

        const trx = await db.transaction();

        try {


            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });


            const user_id = insertedUsersIds[0];

            const insertedClasesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            });

            const class_id = insertedClasesIds[0];

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertYourToMinutes(scheduleItem.from),
                    to: convertYourToMinutes(scheduleItem.to)
                }
            });

            await trx('classes_schedule').insert(classSchedule);


            await trx.commit();
            return response.status(201).send();
        }
        catch (err) {
            console.log(err);
            await trx.rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
}