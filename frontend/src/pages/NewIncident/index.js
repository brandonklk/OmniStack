import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import validationField from '../../utils/validationFields';

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState('');
    
    const [ validationTitle, setValidationTitle ] = useState();
    const [ validationDescription, setvalidationDescription ] = useState();
    const [ validationValue, setValidationValue ] = useState();

    const validation = validationField(title, description, value)

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');


    async function handleNewIncident(e){
        e.preventDefault();

            if(validation){
                setValidationTitle('Invalido');
                setvalidationDescription('Invalido');
                setValidationValue('Invalido');
                return;
            }else{

                setValidationTitle('');
                setvalidationDescription('');
                setValidationValue('');

                const data = {
                    title,
                    description,
                    value,
                };
        
                try{
                    await api.post('incidents', data, {
                        headers: {
                            Authorization: ongId,
                        }
                    })
                    
                    history.push('/profile');
                }catch(err){
                    alert('Erro ao cadastrar caso, tente novamente.');
                }
            } 

        }
            
    


    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <p className="validation" >{validationTitle}</p>

                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <p className="validation" >{validationDescription}</p>

                    <input 
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <p className="validation" >{validationValue}</p>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}