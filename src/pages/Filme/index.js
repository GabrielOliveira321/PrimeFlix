
import './filme_info.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from "react-toastify"

function Filme() {

    const {id} = useParams(); 
    const navigate = useNavigate();
console.log(id);
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "586034b7d0f9bd76024d501cc8496b74",
                    language: "pt-BR",
                }
            })

            .then((response)=> {
                setFilme(response.data)
                setLoading(false);
            })

            .catch(()=>{
                navigate("/", { replace: true});
                return;
            })
        }

        loadFilme();

        return() => {
            console.log("COMPONENTE DESMONTADO");
        }

    }, [navigate, id]);


    function salvarFilmes() {
        const minhaLista = localStorage.getItem("@primeFlix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);

        if (hasFilme) {
            toast.warn("Este filme já esta na lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso");
    }



    if (loading) {
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>)
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
        
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilmes}>Salvar</button>

                <button>
                    <a target="blank" rel='external' href={`https://youtube.com/results/?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>

        </div>
    )    
}

export default Filme;



// function salvarFilmes() {
//     const minhaLista = localStorage.getItem("@primeFlix");

//     let filmesSalvos = JSON.parse(minhaLista) || [];

//     const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filmesSalvos.id )
    
//     if (!hasFilme) {
//         alert("Esse filme ja esta na lista");
//         return;
//     } 

//     filmesSalvos.push(filme);
//     localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
//     alert("Filme salvo com sucesso");
// }
