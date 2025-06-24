
import { useState } from 'react'
import './App.css'

function App() {


  const [peso, setPeso] = useState(''); 
  const [Valor, setValor] = useState('');
  const [declarado, setDeclarado] = useState('');
  const [markup, setMarkup]= useState('');

  return (
    <main className="bg-white w-screen h-screen">

      <div className="w-full flex justify-center mt-6">
        <h1 className="text-black text-4xl">
          Sistema de importação
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
        <div className="flex flex-col items-center gap-4">
          <input type="text" className="border border-zinc-300 p-2 rounded-md w-72" placeholder="Peso (g)" />
          <input type="text" className="border border-zinc-300 p-2 rounded-md w-72" placeholder="Valor convertido (¥)" />
          <input type="text" className="border border-zinc-300 p-2 rounded-md w-72" placeholder="Declarado (USD)" />
          <input type="text" className="border border-zinc-300 p-2 rounded-md w-72" placeholder="Markup (%)" />

          <button className="bg-black text-white p-2 rounded-md w-72 hover:bg-zinc-800 transition">
            Calcular
          </button>
        </div>
      </div>

    </main>

  )
}

export default App
