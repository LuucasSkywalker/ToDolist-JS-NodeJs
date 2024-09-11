const { select, input } = require('@inquirer/prompts')   /* 
require é uma função built-in .
require é usado para IMPORTANDO UM MODULO/BIBLIOTECA/PACOTES ETC . . 
Como o código está funcinando :
quero importar um modulo, e dentro desse modulo tem um objeto dentro da biblioteca 
que é o inquirer, o @inquirer/prompts 
dentro da biblioteca inquirer/prompts tem um objeto que quero extrair que é
o ( select ). . */


let meta = {
    value: 'Tomar água',
    checked: false,
}
let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"})

        if(meta.length == 0) {
          console.log('A meta não pode ser vazia')
          return
        }    
        
     metas.push({
       value: meta,
       checked: false
     })

}

const start = async () => {  
   

    while(true){

            const opcao = await select({
                message: "Menu >",
                choices: [
                    {
                      name: "Cadastrar meta",
                      value: "cadastrar"  
                    },
                    {
                      name: "Listar Metas",
                      value: "listar"
                    },
                    {
                      name: "Sair",
                      value: "sair"
                    }
                ]
            })
            

            switch(opcao) {
                case "cadastrar":
                    await cadastrarMeta()
                    console.log(metas)
                    break
                    case "listar":
                        console.log("vamos listar")
                        break
                        case "sair":
                            return
            }
    }

}

start()