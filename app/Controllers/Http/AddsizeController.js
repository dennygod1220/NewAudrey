'use strict'
const Database = use('Database')
const sizemod = use('App/Models/Underwearsize')

class AddsizeController {
    async index({view}){
        const sizeinfo = await Database.select('id','size').from('underwearsizes');

        return view.render('hiaudrey/sizeindex',{
            sizeinfo:sizeinfo
        })
    }

    async delete({params,session,response}){
        const del = await sizemod.find(params.id);
        await del.delete()
        session.flash({ notification:'刪除成功' })        
        return response.redirect('/AudreySP/addSizeindex')
    }

    async add({view}){        
        return view.render('hiaudrey.addsizepage')
    }


        //將資料塞進DB
        async create({request,response,session}){
            const data = request.only([
                'size'
            ]);
            await sizemod.create(data)
            session.flash({ notificationSU:'新增成功' })        
            return response.redirect('/AudreySP/addSizeindex')
        }
}

module.exports = AddsizeController
