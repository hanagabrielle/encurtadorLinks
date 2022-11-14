import linkService from "../services/linkService.js"
import hashMaker from '../utils/hashMaker.js'

class Controller{
    async acessarLink(req,res){
        try{
            const {
                link_encurtado
            } = req.params

            let registro = await linkService.buscarAlias(link_encurtado)
            if(registro){
                return res.status(200).redirect(registro.link_original)
            }

            return res.status(404).json({
                mensagem: 'Alias nao corresponde a nenhum link ativo!'
            })
        }
        catch(error){
            console.log(error)
            return res.status(500).json({
                mensagem: 'Um erro interno impediu o servico.'
            })
        }
    }

    async encurtarLink(req,res){
        try{
            let {
                url,
                alias = null
            } = req.body

            alias = alias? alias : hashMaker(8)

            const registro = await linkService.checarExistencia(url,alias)

            if(registro) return res.status(400).json({
                mensagem: 'Link ou alias atualmente em uso.',
                registro
            })

            const novo_registro = await linkService.registrar(url,alias)

            if(!novo_registro) return res.status(500).json({
                mensagem: 'Um erro interno impediu o encurtamento.'
            })

            return res.status(200).json({
                mensagem: 'Encurtamento criado com sucesso!',
                novo_registro
            })
        }
        catch(error){
            console.log(error)
            return res.status(500).json({
                mensagem: 'Um erro interno impediu o servico.'
            })
        }
    }

    async listarEncurtamentos(req,res){
        try{
            const registros = await linkService.buscarRegistrosAtivos()

            if(!registros) return res.status(404).json({
                mensagem: 'Nao foram encontrados registros!'
            })

            return res.status(200).json({
                mensagem: 'Foram encontrados '+registros.length+' encurtamento(s) ativos!',
                total_registros:registros.length,
                registros
            })
        }
        catch(error){
            console.log(error)
            return res.status(500).json({
                mensagem: 'Erro interno impede a lista de ser carregada!',
                error
            })
        }
    }

    async desativarEncurtamento(req,res){
        try{
            const {
                id_registro
            } = req.params

            const registro = await linkService.buscarRegistroId(id_registro)

            if(!registro) return res.status(404).json({
                mensagem: 'Registro nao encontrado!',
                id_registro
            })

            const registro_desativado = await linkService.desativarRegistro(id_registro)

            if(!registro_desativado) return res.status(500).json({
                mensagem: 'Um erro interno do servidor impede o link de ser desativado.',
                id_registro
            })

            return res.status(200).json({
                mensagem: 'Registro desativado.',
                registro
            })
        }
        catch(error){
            console.log(error)
            return res.status(500).json({
                mensagem: 'Erro interno impede a lista de ser carregada!',
                error
            })
        }
    }
}

export default new Controller()