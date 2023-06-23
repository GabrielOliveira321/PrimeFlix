
import { Link } from "react-router-dom";
import "./favoritos.css"

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Favoritos() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {

        const minhaLista = localStorage.getItem("@primeFlix");
        setFilmes(JSON.parse(minhaLista) || []);

    }, [])

    function excluirFilme(id) {
        let filtroFilme = filmes.filter( (item) => {
            return (item.id !== id)
        })
        setFilmes(filtroFilme);
        localStorage.setItem("@primeFlix", JSON.stringify(filtroFilme));
        toast.success("Filme removido com sucesso");
    }

    return(
        <div className="meus-filmes">
            <h1>Meus filmes</h1>

            {filmes.length === 0 && <span> Você não tem nenhum filme salvo :( </span>}

            <ul>
                {filmes.map(item => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>

                            <div>
                                <Link to={`/filme/${item.id}`}>Detalhes do filme</Link>
                                <button onClick={ () => excluirFilme(item.id) }>Excluir</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    ); 
}

export default Favoritos;

