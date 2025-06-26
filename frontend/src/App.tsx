
import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {


  const [peso, setPeso] = useState(''); 
  const [valor, setValor] = useState('');
  const [declarado, setDeclarado] = useState('');
  const [markup, setMarkup]= useState('');
  const [resp, setResp] = useState('')
  async function ChamarAPI () {

   

    try {

       const url = "http://localhost:3001/calcular";
    const data = {
      peso: peso,
      ValorConvertido: valor,
      Declarado: declarado,
      markup: markup 
    }

      const resposta = await axios.post(url, data)
      setResp(resposta.data)
  
      
    } catch  (error) {
          console.error("Erro ao chamar API:", error);

    }
} 

  return (
    <main className="bg-white w-screen h-screen">

      <div className="w-full flex justify-center mt-6">
        <h1 className="text-black text-4xl">
          Sistema de importação
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
        <div className="flex flex-col items-center gap-4">
          <input value={peso} onChange={e => setPeso(e.target.value)} type="text" className="border border-zinc-300 p-2 rounded-md w-72" placeholder="Peso (g)" />
          <input value={valor} onChange={e => setValor(e.target.value)} type="text" className="border border-zinc-300 p-2 rounded-md w-72" placeholder="Valor convertido (¥)" />
          <input value={declarado} onChange={e => setDeclarado(e.target.value)} type="text" className="border border-zinc-300 p-2 rounded-md w-72" placeholder="Declarado (USD)" />
          <input value={markup} onChange={e => setMarkup(e.target.value)} type="text" className="border border-zinc-300 p-2 rounded-md w-72" placeholder="Markup (%)" />

          <button onClick={ChamarAPI} className="bg-black text-white p-2 rounded-md w-72 hover:bg-zinc-800 transition">
            Calcular
          </button>

        {resp && (
           <pre className="bg-gray-800 p-4 rounded mt-4 w-full max-w-md text-green-300">
               {JSON.stringify(resp, null, 2)}
           </pre>
        )}


        </div>
      </div>

    </main>

  )
}

export default App
