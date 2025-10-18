// ====== CLASSE ALUNO ======
class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = Number(idade);
    this.curso = curso;
    this.notaFinal = parseFloat(notaFinal);
  }

  isAprovado() {
    return this.notaFinal >= 7;
  }

  toString() {
    return `${this.nome} (${this.curso}) - Nota: ${this.notaFinal}`;
  }
}

let alunos = [];

const form = document.getElementById('formAluno');
const tabela = document.getElementById('tabelaAlunos');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const curso = document.getElementById('curso').value;
  const nota = document.getElementById('nota').value;

  alunos.push(new Aluno(nome, idade, curso, nota));
  renderTabela();
  form.reset();
});

function renderTabela() {
  tabela.innerHTML = '';
  alunos.forEach((aluno, i) => {
    tabela.innerHTML += `
      <tr>
        <td>${aluno.nome}</td>
        <td>${aluno.idade}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.notaFinal}</td>
        <td>
          <button onclick="editar(${i})">Editar</button>
          <button onclick="excluir(${i})">Excluir</button>
        </td>
      </tr>`;
  });
}

function excluir(i) {
  alunos.splice(i, 1);
  renderTabela();
}

function editar(i) {
  const aluno = alunos[i];
  document.getElementById('nome').value = aluno.nome;
  document.getElementById('idade').value = aluno.idade;
  document.getElementById('curso').value = aluno.curso;
  document.getElementById('nota').value = aluno.notaFinal;
  excluir(i);
}


// ====== RELATÓRIOS (filter, map, reduce, sort) ======
const saidaRelatorios = document.getElementById('saidaRelatorios');

const renderRelatorio = (titulo, html) => {
  saidaRelatorios.innerHTML = `
    <div class="card-relatorio">
      <h3>${titulo}</h3>
      <div>${html}</div>
    </div>`;
};

const aprovados = () =>
  alunos.filter(a => (typeof a.isAprovado === 'function' ? a.isAprovado() : Number(a.notaFinal) >= 7));

const mediaNotas = () => {
  if (!alunos.length) return 0;
  const soma = alunos.reduce((acc, a) => acc + Number(a.notaFinal || 0), 0);
  return soma / alunos.length;
};

const mediaIdades = () => {
  if (!alunos.length) return 0;
  const soma = alunos.reduce((acc, a) => acc + Number(a.idade || 0), 0);
  return soma / alunos.length;
};

const nomesOrdemAlfabetica = () =>
  alunos.map(a => a.nome).filter(Boolean)
        .sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));

const quantidadePorCurso = () =>
  alunos.reduce((acc, a) => {
    const c = a.curso || 'Sem curso';
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});

// ====== Eventos (usando addEventListener + arrow functions) ======
document.getElementById('btnAprovados').addEventListener('click', () => {
  const lista = aprovados();
  if (!lista.length) {
    renderRelatorio('Aprovados', '<em>Nenhum aluno aprovado.</em>');
    return;
  }
  const linhas = lista.map(a =>
    `<li>${a.nome} — ${a.curso} (nota: ${Number(a.notaFinal).toFixed(1)})</li>`
  ).join('');
  renderRelatorio('Aprovados', `<ul>${linhas}</ul>`);
  console.log('Relatório gerado: Aprovados');
});

document.getElementById('btnMediaNota').addEventListener('click', () => {
  const m = mediaNotas();
  renderRelatorio('Média das Notas', `<strong>${m.toFixed(2)}</strong>`);
  console.log('Relatório gerado: Média das Notas');
});

document.getElementById('btnMediaIdade').addEventListener('click', () => {
  const m = mediaIdades();
  renderRelatorio('Média das Idades', `<strong>${m.toFixed(1)}</strong> anos`);
  console.log('Relatório gerado: Média das Idades');
});

document.getElementById('btnOrdemAlfabetica').addEventListener('click', () => {
  const nomes = nomesOrdemAlfabetica();
  if (!nomes.length) {
    renderRelatorio('Nomes A–Z', '<em>Nenhum nome cadastrado.</em>');
    return;
  }
  renderRelatorio('Nomes A–Z', `<ol>${nomes.map(n => `<li>${n}</li>`).join('')}</ol>`);
  console.log('Relatório gerado: Nomes A–Z');
});

document.getElementById('btnPorCurso').addEventListener('click', () => {
  const mapa = quantidadePorCurso();
  const linhas = Object.entries(mapa)
    .map(([curso, qtd]) => `<tr><td>${curso}</td><td>${qtd}</td></tr>`).join('');
  const tabela = `
    <table border="1" cellpadding="6">
      <thead><tr><th>Curso</th><th>Quantidade</th></tr></thead>
      <tbody>${linhas || '<tr><td colspan="2"><em>Nenhum dado.</em></td></tr>'}</tbody>
    </table>`;
  renderRelatorio('Quantidade por Curso', tabela);
  console.log('Relatório gerado: Quantidade por Curso');
});

