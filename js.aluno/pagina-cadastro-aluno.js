// js.aluno/pagina-cadastro-aluno.js
(function(){
  const $ = (s)=>document.querySelector(s);
  const ui = {
    nome: $("#idnome"),
    idade: $("#ididade"),
    curso: $("#idcurso"),
    nota: $("#idnotafinal"),
    btn: $("#btnCadastrar"),
    tbody: $("#tabelaAluno")
  };

  let editIndex = null;

  function normalizaNumero(v){
    // permite usar vírgula (7,5) ou ponto (7.5)
    return Number(String(v ?? "").replace(",", "."));
  }

  function limpar(){
    ui.nome.value = "";
    ui.idade.value = "";
    ui.nota.value = "";
    ui.curso.selectedIndex = 0;
    editIndex = null;
    ui.btn.textContent = "Cadastrar";
    ui.nome.focus();
  }

  function validar(){
    if(!ui.nome.value.trim()) return alert("Informe o nome.");
    if(!ui.idade.value) return alert("Informe a idade.");
    if(ui.curso.selectedIndex <= 0) return alert("Selecione o curso.");
    if(!ui.nota.value) return alert("Informe a nota final.");
    return true;
  }

  function salvar(e){
    e.preventDefault();
    if(!validar()) return;

    const cursoTexto = ui.curso.options[ui.curso.selectedIndex].text;
    const aluno = new Aluno(
      ui.nome.value,
      normalizaNumero(ui.idade.value),
      cursoTexto,
      normalizaNumero(ui.nota.value)
    );

    if(editIndex === null){
      AppAluno.repo.adicionar(aluno);
    } else {
      AppAluno.repo.atualizar(editIndex, aluno);
    }

    render();
    limpar();
  }

  function render(){
    const lista = AppAluno.repo.listar();
    ui.tbody.innerHTML = "";
    lista.forEach((a,i)=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i+1}</td>
        <td>${a.nome}</td>
        <td>${a.idade}</td>
        <td>${a.curso}</td>
        <td>${a.notaFinal}</td>
        <td>
          <button class="btn btn-sm btn-primary me-2" data-a="ed" data-i="${i}">Editar</button>

          <button class="btn btn-sm btn-danger" data-a="rm" data-i="${i}">Excluir</button>
        </td>`;
      ui.tbody.appendChild(tr);
    });
  }

  // delegação de eventos para editar/excluir
  ui.tbody.addEventListener("click",(ev)=>{
    const b = ev.target.closest("button[data-a]");
    if(!b) return;
    const i = Number(b.dataset.i);
    const acao = b.dataset.a;

    if(acao === "ed"){
      const a = AppAluno.repo.listar()[i];
      ui.nome.value = a.nome;
      ui.idade.value = a.idade;
      ui.nota.value = a.notaFinal;
      for(let k=0;k<ui.curso.options.length;k++){
        if(ui.curso.options[k].text.toLowerCase() === a.curso.toLowerCase()){
          ui.curso.selectedIndex = k; break;
        }
      }
      editIndex = i;
      ui.btn.textContent = "Salvar";
      ui.nome.focus();
    }

    if(acao === "rm"){
      if(confirm("Excluir este aluno?")){
        AppAluno.repo.remover(i);
        render();
      }
    }
  });

  ui.btn.addEventListener("click", salvar);

  // primeira renderização
  render();
  ui.nome && ui.nome.focus();
})();
