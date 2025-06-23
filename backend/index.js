import axios from 'axios';
import express from 'express';
const app = express();
app.use(express.json());

function calcularFrete(gramas) {
  let adicional = Math.max(gramas - 100, 0);
  return 42.05 + (Math.ceil(adicional / 100) * 9.25);
}

async function COTACAO_DOLAR_REAL() {
  const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL";
  const resp = await axios.get(url);
  const cotacao = parseFloat(resp.data.USDBRL.bid);
  return cotacao;
}

async function converterDolarParaReal(valorDolar) {
  const cotacao = await COTACAO_DOLAR_REAL();
  return valorDolar * cotacao;
}

async function calcularImposto(precoDeclaradoDolar, frete) {
  const precoDeclaradoReal = await converterDolarParaReal(precoDeclaradoDolar);
  const base = precoDeclaradoReal + frete;
  const imposto = base * 0.6;
  return imposto;
}

function calcularPrecoDeVenda(custoTotal, markupPercentual) {
  const precoVenda = custoTotal * (1 + (markupPercentual / 100));
  const lucro = precoVenda - custoTotal;
  return {
    precoVenda: precoVenda.toFixed(2),
    lucro: lucro.toFixed(2)
  };
}

app.post('/calcular', async (req, res) => {
  const { peso, ValorConvertido, Declarado, markup } = req.body;

  if (!peso || peso <= 0) return res.status(400).send("Erro: peso inválido");
  if (!ValorConvertido || ValorConvertido <= 0) return res.status(400).send("Erro: valor convertido inválido");
  if (!Declarado || Declarado <= 0) return res.status(400).send("Erro: valor declarado inválido");

  const frete = calcularFrete(peso);

  const precoDeclaradoReal = await converterDolarParaReal(Declarado);
  const imposto = await calcularImposto(Declarado, frete);
  const total = precoDeclaradoReal + frete + imposto;

  let resultadoLucro = null;

  if (markup && markup > 0) {
    resultadoLucro = calcularPrecoDeVenda(total, markup);
  }

  res.json({
    custo_frete: frete.toFixed(2),
    preco_real: precoDeclaradoReal.toFixed(2),
    imposto_importacao: imposto.toFixed(2),
    total: total.toFixed(2),
    ...(resultadoLucro && {
      preco_venda: resultadoLucro.precoVenda,
      lucro: resultadoLucro.lucro,
      markup_aplicado: `${markup}%`
    })
  });
});

const PORTA = 3001;
app.listen(PORTA, () => console.log(`API rodando na porta ${PORTA}`));
