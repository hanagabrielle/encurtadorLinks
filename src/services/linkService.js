import {addDays, format} from 'date-fns'
import {Op} from 'sequelize'
import link from "../models/link.model.js"


class linkService{
    async buscarRegistrosAtivos(){
        try{
            const registros = await link.findAll({
                where: {
                    link_status: true
                },
                raw : true
            })

            if(registros && registros.length >0) return registros
            else return null
        }
        catch(error){
            console.log(error)
            return null
        }
    }

    async buscarAlias(alias){
        try{
            const [registro_alias] = await link.findAll({
                where:{
                    alias: alias,
                    link_status: true               
                },
                raw : true
            })

            if(registro_alias) return registro_alias
            else return null
        }
        catch(error){
            console.log(error)
            return null
        }
    }

    async buscarLink(url){
        try{
            const [registro_link] = await link.findAll({
                where:{
                    link_original: url,
                    link_status: true
                },                
                raw : true
            })

            if(registro_link) return registro_link
            else return null
        }
        catch(error){
            console.log(error)
            return null
        }
    }

    async registrar(url,alias){
        try{
            const registro_alias = await link.create({
                link_original: url,
                alias: alias,
                link_status: true
            })

            return {
                id: registro_alias.id,
                // link_original: registro_alias.link_original,
                link_encurtado: 'http://localhost:3000/l/'+registro_alias.alias,
                validade: format(addDays(new Date(),7),'dd/MM/yyyy')
            }
        }
        catch(error){
            console.log(error)
            return null
        }
    }

    async checarExistencia(url,alias){
        try{
            const registro_alias = await this.buscarAlias(alias)

            if(registro_alias) return {
                id: registro_alias.id,
                alias: registro_alias.alias,
                link: registro_alias.link_original
            }

            const registro_link = await this.buscarLink(url)

            if(registro_link) return {
                id: registro_link.id,
                alias: registro_link.alias,
                url: registro_link.link_original
            }

            return null
        }
        catch(error){
            console.log(error)
            return null
        }
    }

    async buscarRegistroId(id_registro){
        try{
            const registro = await link.findAll({
                where: {
                    id: id_registro
                },
                raw : true
            }) 

            if(registro && registro.length >0) return registro[0]
            else return null
        }
        catch(error){
            console.log(error)
            return null
        }
    }

    async desativarRegistro(id_registro){
        try{
            const registros_desativados = await link.update({link_status: false},{
                where: {
                    id: id_registro
                },
                raw : true
            }) 

            return registros_desativados[0]
        }
        catch(error){
            console.log(error)
            return null
        }
    }

    async desativarRegistrosVencidos(){
        try{
            const registros = await link.update({link_status: false},{
                where: {
                    link_status: true,
                    createdAt:{
                        [Op.lt]: addDays(new Date(), -7)
                    }
                },
                raw : true
            }) 
            return registros[0]
        }
        catch(error){
            console.log(error)
            return null
        }
    }
}
export default new linkService()