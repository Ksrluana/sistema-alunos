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
