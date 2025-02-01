import { useState } from "react";
import "./CalculadoraIdade.css";

export default function CalculadoraIdade() {
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [idade, setIdade] = useState(null);
  const [erro, setErro] = useState("");

  function calcularIdade() {
    setErro("");
    const diaNum = parseInt(dia, 10);
    const mesNum = parseInt(mes, 10);
    const anoNum = parseInt(ano, 10);
    
    if (!dia || !mes || !ano) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }
    if (isNaN(diaNum) || isNaN(mesNum) || isNaN(anoNum)) {
      setErro("Digite apenas números.");
      return;
    }
    if (diaNum < 1 || diaNum > 31) {
      setErro("O dia deve estar entre 1 e 31.");
      return;
    }
    if (mesNum < 1 || mesNum > 12) {
      setErro("O mês deve estar entre 1 e 12.");
      return;
    }
    const dataNascimento = new Date(anoNum, mesNum - 1, diaNum);
    if (
      dataNascimento.getDate() !== diaNum ||
      dataNascimento.getMonth() !== mesNum - 1 ||
      dataNascimento.getFullYear() !== anoNum
    ) {
      setErro("Data inválida.");
      return;
    }
    const hoje = new Date();
    if (dataNascimento > hoje) {
      setErro("A data não pode ser maior que a atual.");
      return;
    }
    
    let anos = hoje.getFullYear() - anoNum;
    let meses = hoje.getMonth() - (mesNum - 1);
    let dias = hoje.getDate() - diaNum;

    if (dias < 0) {
      meses--;
      dias += new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
    }
    if (meses < 0) {
      anos--;
      meses += 12;
    }
    
    setIdade({ anos, meses, dias });
  }

  return (
    <div className="calculadora-container">
      <div className="inputs-container">
        <div className="input-grupo">
          <label>Day</label>
          <input
            type="text"
            placeholder="Dia"
            value={dia}
            onChange={(e) => setDia(e.target.value)}
            className="input-field"
          />
          <label>Month</label>
          <input
            type="text"
            placeholder="Mês"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            className="input-field"
          />
          <label>Year</label>
          <input
            type="text"
            placeholder="Ano"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            className="input-field"
          />
        </div>
        <button onClick={calcularIdade} className="calcular-button">
        </button>
        {erro && <p className="erro-mensagem">{erro}</p>}
        {idade && (
          <div className="resultado-container">
            <p>{idade.anos} anos</p>
            <p>{idade.meses} meses</p>
            <p>{idade.dias} dias</p>
          </div>
        )}
      </div>
    </div>
  );
}
