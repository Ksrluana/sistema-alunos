(function(){
  const $ = s => document.querySelector(s);
  const ui = {
    aprov: $("#relAprovados"),
    medNotas: $("#relMediaNotas"),
    medIdades: $("#relMediaIdades"),
    nomes: $("#relNomesOrdem"),
    qtdCurso: $("#relQtdPorCurso")
  };

  function atualizar() {
    const repo = AppAluno.repo;
    const alunos = repo.listar();

    if (!alunos || alunos.length === 0) {
      if (ui.aprov) ui.aprov.innerHTML = "<em>Nenhum aluno cadastrado.</em>";
      if (ui.medNotas) ui.medNotas.textContent = "-";
      if (ui.medIdades) ui.medIdades.textContent = "-";
      if (ui.nomes) ui.nomes.innerHTML = "<em>Sem dados.</em>";
      if (ui.qtdCurso) ui.qtdCurso.innerHTML = "<em>Sem dados.</em>";
      return;
    }

    // Aprovados
    const aprovados = alunos.filter(a => a.isAprovado());
    ui.aprov.innerHTML = aprovados.length
      ? aprovados.map(a => `<li>${a.nome} (${a.curso}) — Nota ${a.notaFinal}</li>`).join("")
      : "<em>Nenhum aluno aprovado.</em>";

    // Média das notas
    const mediaNotas = alunos.reduce((acc, a) => acc + a.notaFinal, 0) / alunos.length;
    ui.medNotas.textContent = mediaNotas.toFixed(2);

    // Média das idades
    const mediaIdades = alunos.reduce((acc, a) => acc + a.idade, 0) / alunos.length;
    ui.medIdades.textContent = mediaIdades.toFixed(2);

    // Nomes ordenados
    const nomesOrdenados = alunos.map(a => a.nome).sort((a, b) => a.localeCompare(b));
    ui.nomes.innerHTML = nomesOrdenados.map(n => `<li>${n}</li>`).join("");

    // Quantidade por curso
    const qtdPorCurso = alunos.reduce((acc, a) => {
      acc[a.curso] = (acc[a.curso] || 0) + 1;
      return acc;
    }, {});
    ui.qtdCurso.innerHTML = Object.keys(qtdPorCurso)
      .map(curso => `<li>${curso}: ${qtdPorCurso[curso]}</li>`)
      .join("");
  }

  // Atualiza automaticamente ao abrir
  atualizar();
})();
