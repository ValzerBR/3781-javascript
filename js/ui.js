import api from "./api.js"

const ui = {

  async preencherFormulario(pensamentoId) {
    const pensamento = await api.buscarPensamentoPorId(pensamentoId)
    document.getElementById("pensamento-id").value = pensamento.id
    document.getElementById("pensamento-conteudo").value = pensamento.conteudo
    document.getElementById("pensamento-autoria").value = pensamento.autoria
  },

  async renderizarPensamentos() {
    const listaPensamentos = document.getElementById("lista-pensamentos")
    const mensagemVazia = document.getElementById("mensagem-vazia")
    listaPensamentos.innerHTML = ""

    try {
      const pensamentos = await api.buscarPensamentos()
      pensamentos.forEach(ui.adicionarPensamentoNaLista)
    }
    catch {
      alert('Erro ao renderizar pensamentos')
    }
  },

  adicionarPensamentoNaLista(pensamento) {
    const listaPensamentos = document.getElementById("lista-pensamentos")
    const li = document.createElement("li")
    li.setAttribute("data-id", pensamento.id)
    li.classList.add("li-pensamento")

    const iconeAspas = document.createElement("img")
    iconeAspas.src = "assets/imagens/aspas-azuis.png"
    iconeAspas.alt = "Aspas azuis"
    iconeAspas.classList.add("icone-aspas")

    const conteudo = document.createElement("div")
    conteudo.textContent = pensamento.conteudo
    conteudo.classList.add("pensamento-conteudo")

    const autoria = document.createElement("div")
    autoria.textContent = pensamento.autoria
    autoria.classList.add("pensamento-autoria")

    const botaoEditar = document.createElement("button")
    botaoEditar.classList.add("botao-editar")
    botaoEditar.addEventListener("click", () => ui.preencherFormulario(pensamento.id))

    const iconeEditar = document.createElement("img")
    iconeEditar.src = "assets/imagens/icone-editar.png"
    iconeEditar.alt = "Editar"
    
    botaoEditar.appendChild(iconeEditar)
    const icones = document.createElement("div")
    icones.classList.add("icones")
    icones.appendChild(botaoEditar)

    const botaoExcluir = document.createElement("button")
    botaoExcluir.classList.add("botao-excluir")
    botaoExcluir.addEventListener("click", () => api.deletarPensamento(pensamento))

    const iconeExcluir = document.createElement("img")
    iconeExcluir.src = "assets/imagens/icone-excluir.png"
    iconeExcluir.alt = "Excluir"
    botaoExcluir.appendChild(iconeExcluir)
    icones.appendChild(botaoExcluir)


    li.appendChild(iconeAspas)
    li.appendChild(conteudo)
    li.appendChild(autoria)
    li.appendChild(icones)

    listaPensamentos.appendChild(li)
  },

  limparFormulario(){
    document.getElementById("pensamento-form").reset()
  },

  async verificaListaVazia(){
    const pensamentos = await api.buscarPensamentos()
    if (pensamentos.length == 0){
        const listaPensamentos = document.getElementById("lista-pensamentos")
        const campoListaVazia = document.createElement("div")
        const msgListaVazia = document.createElement("p")
        msgListaVazia.textContent = "Nada por aqui ainda, que tal compartilhar alguma ideia?"
        const imgListaVazia = document.createElement("img")
        imgListaVazia.src = "assets/imagens/lista-vazia.png"
        listaPensamentos.classList.add("mensagem-vazia")
        campoListaVazia.appendChild(msgListaVazia)
        campoListaVazia.appendChild(imgListaVazia)
        listaPensamentos.appendChild(campoListaVazia)
    }
  }
}
export default ui