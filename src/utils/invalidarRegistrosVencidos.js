import linkService from "../services/linkService.js";

export default async function invalidarVencidos(){    
    console.log('Invalidando registros com mais de 7 dias ...')
    const qtdRegistrosVencidos = await linkService.desativarRegistrosVencidos()
    if(!qtdRegistrosVencidos || qtdRegistrosVencidos == 0){
        console.log('Nao houveram registros para invalidar ainda!')
        return null
    }
    else {
        console.log('Foram invalidados',qtdRegistrosVencidos,'registros.')
        return true
    }
}