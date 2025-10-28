// Classe + repositório (compartilhado entre as páginas)

class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    const toNum = v => Number(String(v ?? "").replace(",", "."));
    this.nome = String(nome ?? "").trim();
    this.idade = toNum(idade);
    this.curso = String(curso ?? "").trim();
    this.notaFinal = toNum(notaFinal);
  }
  isAprovado(){ return this.notaFinal >= 7; }
  toString(){
    return `Nome: ${this.nome} | Idade: ${this.idade} | Curso: ${this.curso} | Nota: ${this.notaFinal} | Aprovado: ${this.isAprovado() ? "Sim" : "Não"}`;
  }
}


class RepoAlunos {
  constructor(key="db_alunos_v1"){ this.key=key; this._cache=this._load(); }
  _load(){
    try{
      const raw = localStorage.getItem(this.key);
      const arr = raw ? JSON.parse(raw) : [];
      return arr.map(a=>new Aluno(a.nome,a.idade,a.curso,a.notaFinal));
    }catch{ return []; }
  }
  _save(){ localStorage.setItem(this.key, JSON.stringify(this._cache)); }
  listar(){ return [...this._cache]; }
  adicionar(a){ this._cache.push(a); this._save(); }
  atualizar(i,a){ if(i>=0 && i<this._cache.length){ this._cache[i]=a; this._save(); } }
  remover(i){ if(i>=0 && i<this._cache.length){ this._cache.splice(i,1); this._save(); } }
}

window.AppAluno = {
  repo: new RepoAlunos()
};
