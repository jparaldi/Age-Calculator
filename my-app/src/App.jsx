import { useState } from "react";
import "./App.css";

export default function CalculadoraIdade() {
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [idade, setIdade] = useState({ anos: "--", meses: "--", dias: "--" });
  const [erro, setErro] = useState({dia: "", mes: "", ano: ""});

  function validarCampo (nomeCampo, valor){

    let mensagemErro = "";

    if (!valor) {
      mensagemErro = "This field is required.";
    }
    if (nomeCampo === "dia" && (isNaN(valor) || valor < 1 || valor > 31)) {
      mensagemErro = "Must be a valid day";
    }
    if (nomeCampo === "mes" && (isNaN(valor) || valor < 1 || valor > 12)) {
      mensagemErro = "Must be a valid month";
    }
    if (nomeCampo === "ano" && (isNaN(valor) || valor > new Date().getFullYear())) {
      mensagemErro = "Must be in the past";
    }
    
    setErro((prev) => ({...prev, [nomeCampo]: mensagemErro}));
  }

  function validarFormulario() {
    return dia && mes && ano && !erro.dia && !erro.mes && !erro.ano;
  }

  function calcularIdade() {

    if(!validarFormulario()){
      return;
    }

    let ErrosForms = ({dia: "", mes: "", ano: ""});
    const diaNum = parseInt(dia, 10);
    const mesNum = parseInt(mes, 10);
    const anoNum = parseInt(ano, 10);
    
    if (!dia) {
      ErrosForms.dia = "This field is required.";
    }
    if (!mes) {
      ErrosForms.mes = "This field is required.";
    }
    if (!ano) {
      ErrosForms.ano = "This field is required.";
    }

    const dataNascimento = new Date(anoNum, mesNum - 1, diaNum);
    if (
      dataNascimento.getDate() !== diaNum ||
      dataNascimento.getMonth() !== mesNum - 1 ||
      dataNascimento.getFullYear() !== anoNum
    ) {
      ErrosForms.getDate = "Must be a valid day";
      ErrosForms.getMonth = "Must be a valid month";
      ErrosForms.getFullYear = "Must be in the past";
    }

    if (Object.values(ErrosForms).some(err => err !== "")) {
      setErro(ErrosForms);
      return;
    }

    const hoje = new Date();
    if (dataNascimento > hoje) {
      setErro("The birth date must be in the past.");
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
    
    setErro({dia: "", mes: "", ano: ""});
    setIdade({ anos, meses, dias });
  }

  return (
    <div className="calculadora-container">
      <div className="inputs-container">
        <div className="input-Item">
          <label className={erro.dia ? "label-erro" : ""}>DAY</label>
          <input
            type="text"
            placeholder="Day"
            value={dia}
            onChange={(e) => {
              setDia(e.target.value)
              validarCampo("dia", e.target.value)
            }}
            className = {erro.dia ? "input-field erro" : "input-field"}
          />
          {erro.dia && <span className="erro-message">{erro.dia}</span>}
        </div>
        <div className="input-Item">
          <label className={erro.mes ? "label-erro" : ""}>MONTH</label>
          <input
            type="text"
            placeholder="Month"
            value={mes}
            onChange={(e) => {
              setMes(e.target.value)
              validarCampo("mes", e.target.value)  
            }}
            className = {erro.mes ? "input-field erro" : "input-field"}
          />
          {erro.mes && <span className="erro-message">{erro.mes}</span>}
        </div>
        <div className="input-Item">
          <label className={erro.ano ? "label-erro" : ""}>YEAR</label>
          <input
            type="text"
            placeholder="Year"
            value={ano}
            onChange={(e) => {
              setAno(e.target.value)
              validarCampo("ano", e.target.value)
            }}
            className = {erro.ano ? "input-field erro" : "input-field"}
          />
          {erro.ano && <span className="erro-message">{erro.ano}</span>}
        </div>
      </div>
      <div className="Botao-container">
        <div className="linha"></div>
        <button onClick={calcularIdade} className="calcular-button" disabled={!validarFormulario()}></button>
      </div>
      {idade && (
        <div className="resultado-container">
          <p><span className="Idade">{idade.anos}</span> years</p>
          <p><span className="Idade">{idade.meses}</span> months</p>
          <p><span className="Idade">{idade.dias}</span> days</p>
        </div>
      )}
    </div>
  );
}
