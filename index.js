// npm install inquirer
const { select, input, checkbox } = require('@inquirer/prompts')  /*
(No Node.js, require é uma função built-in usada para carregar módulos, 
ou bibliotecas que podem ser arquivos externos, pacotes instalados globalmente
ou módulos internos do próprio Node.js) 
require('@inquirer/prompts') diz que quero um objeto de dentro de @inquirer/prompts
que é o { select, input, checkbox } .*/

let mensagem = "Metas"
// ---------CADASTRAR METAS -----------
/*let meta = {
    value: 'Tomar água',
    checked: false,
}*/
let metas = [] /*(04) seguência, criando uma let metas = onde irá receber 
o valor  da "meta" inserida em um array vazio . Esse valor é atribuido usando dentro 
da função "const cadastrarMeta = async () => {} colocando um "push" para pegar um 
valor de dentro de meta e adicionado dentro do array vazio de metas. "metas.push" */

const cadastrarMeta = async () => { /* (03) sequência, primeira função do menu. 
criando a primeira função que é cadastrar metas, onde irá amarzenar a meta do usuário
 usando o "cadastrarMeta" que é uma função que está no switch "cadastrarMetas" 
                     case "cadastrar":
                     await cadastrarMeta()
"await cadastrarMeta()" . Essa const irá receber seu valor cadastrado pelo usuário.
 está sendo um codigo async/await , ou seja esperando usuário cadastrar sua meta para
 seguir com o cogido "const'star' que tem o while(true) e switch .
  */
    const meta = await input({ message: "Digite a meta:"}) /* nessa função é onde
    a meta cadastrada pelo usuário irá ficar amarzenada em "META", que diz espera
    o usário digitar sua meta "await" que tem um "INPUT" que é um prompts interativo
    deixando o usuário digitar para escrever sua meta*/

    //usando o if para fazer uma VALIDAÇÃO
        if(meta.length == 0) { /*(if/else/switch) condicional, estrutura de 
          controle do fluxo da aplicação : usando if(meta.length == 0) estou
          comparando se o texto "meta.length" que o usuário digitou é igual a 0, 
          ou seja não digitou nada. Então retorno uma mensagem no console.log
          dizendo que não pode ser vazia. OBS se quisesse que o usuário ficasse
          preso aqui até ele digitar uma meta não vazia, colocaria no return o
          cadastraMeta() que na função iria terminar em return mais ele chamaria a
          a função novamente e ficaria só na tela até preencher */
          console.log('A meta não pode ser vazia')
          return  // se a pessoa não digitou nada o programa encerra aqui 
        }    
        
     metas.push({  /* aqui em metas.push está adicionando o valor que foi recebido
      de meta quando o usuário digitou para metas. criando um novo elemento do array
      ou seja, ele está pegando a meta que o usuário escreveu que está amarzenada em
      meta e empurrando para metas .    */
       value: meta, // valor: é a meta . aqui o array está pegando objeto de meta
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
/* ------------------------------------------------------------------------------- */
const start = async () => {  /* (01) inicio da aplicação, criando uma função de 
  star, ou inicio. Atribuindo a uma const . Chamando a função "star()". Aqui 
  dentro estará o menu do projeto . "async está ligada a while(true) em
  const opcao = "await" select"*/
   

    while(true){ //(02) seguência (while/ switch) - While controle de fluxo(repetição) 
         mostrarMensagem()
            const opcao = await select({ /* await " vou precisar aguardar" ou
  espere que o usuário vai precisar selecionar alguma coisa . Async/Await é uma 
  promise, ou seja uma promesa que irei ter uma resposta . Irá aguarda uma resposta .
   "SELECT" vai ser uma caixinha para selecionar opção */
                message: "Menu >",  /* no select um objeto extraido de dentro do
  inquirir/prompts precisar se escrito dessa forma . message:, choices:.
  Na biblioteca Inquirer.js, a propriedade CHOICES é usada para definir as opções
  que serão apresentadas ao usuário em um prompt do tipo lista. Isso permite que 
  o usuário selecione uma opção de um conjunto predefinido de escolhas. e espera
  um objeto dentro de um ARRAY [] */
                choices: [
                    {
                      name: "Cadastrar meta", /* quando usuário escolher uma opção
                      o value vai entrar na const "opcao" a opcao vai valer o valor
                      selecionado . Ele vai pro switch(opcao) no case que o usuário
                      escolheu em coices:*/
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
            

            switch(opcao) { /* (if/else/switch) condicional, estruturas controle do 
              fluxo da aplicação.
              switch com parâmentro "opcao" que está dentro da função de repetição
              "while(true)"que contem uma "const opcao = await select" . Após usuário
              escolher uma opção do Menu em choices: que irá para a "const opcao"
              será escolhida o bloco do case, que irá executar e sairá para o while
              fazer novamente o loop para usuário escolher outra opção novamente e 
              iniciar tudo novamente indo para uma nova case*/
                      case "cadastrar":
                      await cadastrarMeta() /* chegando nesse case após usuário
escolher uma opção no choices [] ele irá para switch . Exemplo escolhida a 
opção cadastrar , ira esperar o usuário cadastrar . a função cadastraMeta está 
esperando "await" o usuário cadastrar . Assim que cadastrar o bloco sai (break)*/
                      break // break quebrar o caso, terminar o bloco de codigo

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
                      return // return é para sair da função white(true) e switch
            }
    }

}

start()