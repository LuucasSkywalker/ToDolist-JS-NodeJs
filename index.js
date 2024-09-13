const { select, input, checkbox } = require('@inquirer/prompts')   

let mensagem = "Metas"
// ---------CADASTRAR METAS -----------
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

      mensagem = "Meta Cadastrada com sucesso"
}

// -------LISTAR METAS --------------
const listarMetas = async () => {
    const respostas = await checkbox({
    message: "Use as setas para mudar de meta, o espaço para marcar ou desmacar e o Enter para finalizar",
    choices: [...metas],
    instructions: false,
   })
    
   metas.forEach((m) => {
    m.checked = false
   })


    if ( respostas.length == 0){
            console.log("Nenhuma meta selecionado")
            return
    }

     respostas.forEach((resposta) => {
          const meta = metas.find((m) => {
          return m.value == resposta
          })
          meta.checked = true
      })
      mensagem = 'Meta(s) marcadas como concluída(s)'
}

// ---------METAS REALIZADAS --------------
const metasRealizadas = async () => {
   const realizadas = metas.filter((meta) => {
              return meta.checked
   })
      if(realizadas.length == 0) {
      console.log('Não existem metas realizadas')
      return
   }

      await select({
      message: "Metas Realizadas",
      choices: [...realizadas]
   })

}

// ---------METAS ABERTAS ---------------
const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
     return meta.checked != true
  })

     if(abertas.length == 0) {
       console.log("Não existe metas abertas!")
     return
     }
     await select({
       message: "Metas Abertas",
       choices: [...abertas]
     })
}  

// ----------DELETAR METAS -----------------
const deletarMetas = async () =>{
  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false}
  })

const itemsADeletar = await checkbox({
       message: "Selecione intem para deletar",
       choices: [...metasDesmarcadas],
       instructions: false,
})  

   if(itemsADeletar.length == 0) {
    console.log("Nenhum item para deletar")
    return
   }

   itemsADeletar.forEach((item) => {
      metas.filter((meta) => {
        return meta.value != item
      })
   })

      console.log("Meta(s) deleta(s) com sucesso")
}

const mostrarMensagem = () => {
  console.clear()
  if( mensagem != ""){
    console.log(mensagem)
    console.log("")
    mensagem = ""
  }
}

const start = async () => {  
   

    while(true){
         mostrarMensagem()
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
                      name: "Metas realizadas",
                      value: "realizadas",
                    },
                    {
                      name: "Metas abertas",
                      value: "abertas",
                    },
                    {
                      name: "Deletar Metas",
                      value: "deletar"
                    },
                    {
                      name: "Sair",
                      value: "sair",
                    }
                ]
            })
            

            switch(opcao) {
                   case "cadastrar":
                    await cadastrarMeta()
                    break

                      case "listar":
                      await listarMetas()
                      console.log("vamos listar")
                      break

                      case "realizadas":
                      await metasRealizadas()
                      break

                      case "abertas":
                      await metasAbertas()
                      break

                      case "deletar":
                      await deletarMetas()
                      break

                      case "sair":
                      return
            }
    }

}

start()