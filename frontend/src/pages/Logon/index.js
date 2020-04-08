import React, { useState } from 'react';
import { Link, useHistory,  } from 'react-router-dom';
import { FiLogIn, FiLoader } from 'react-icons/fi';

import api from '../../services/api';
import validationField from '../../utils/validationFields';

import './style.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon(){
    const [id, setId] = useState('');
    const [validationId, setValidationId] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const validation = validationField(id.trim());

    async function handleLogin(e){
        e.preventDefault();

        if(validation){
            setValidationId('Invalido');
            return;
        }else{
            setValidationId('');

            try {
                setLoading(true);
                const response = await api.post('session', { id });
                localStorage.setItem('ongId', id);
                localStorage.setItem('ongName', response.data.name);

                setLoading(false);

                history.push('/profile');
     
            } catch (err) {
                console.log(err);
                setValidationId('Falha no login');
                setLoading(false);
            }
        }

    }
   

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Seu ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <p className="validation">{validationId}</p>
                   
                    {loading ? 
                        
                        <button className="button" type="submit" disabled={loading}>
                            <FiLoader size={22} color="#0000000" style={{ marginTop: 19 }}/>
                        </button>
                        
                    :
                        <button className="button" type="submit">
                            Entrar
                        </button>

                    }

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                     
                </form>
            </section>
            
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}