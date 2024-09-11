const { select } = require('@inquirer/prompts')   /* 
require é uma função built-in .
require é usado para IMPORTANDO UM MODULO/BIBLIOTECA/PACOTES ETC . . 
Como o código está funcinando :
quero importar um modulo, e dentro desse modulo tem um objeto dentro da biblioteca 
que é o inquirer, o @inquirer/prompts 
dentro da biblioteca inquirer/prompts tem um objeto que quero extrair que é
o ( select ). . */

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
                    console.log("vamos cadastrar")
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