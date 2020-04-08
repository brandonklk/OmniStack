import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiLoader } from 'react-icons/fi';

import api from '../../services/api';
import validationField from '../../utils/validationFields';

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Register(){
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ city, setCity ] = useState('');
    const [ uf, setUf ] = useState('');

    const [ validationName, setValidationName ] = useState('');
    const [ validationEmail, setValidationEmail ] = useState('');
    const [ validationWhatsapp, setValidationWhatsapp ] = useState('');
    const [ validationCity, setValidationCity ] = useState('');
    const [ validationUf, setValidationUf ] = useState('');

    const [loading, setLoading] = useState(false);

    const validation = validationField(name, email, whatsapp, city, uf);

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        if(validation){
            setValidationName('Invalido');
            setValidationEmail('Invalido');
            setValidationWhatsapp('Invalido');
            setValidationCity('Invalido');
            setValidationUf('Invalido');
        }else{

            setValidationName('');
            setValidationEmail('');
            setValidationWhatsapp('');
            setValidationCity('');
            setValidationUf('');

            const data = {
                name,
                email,
                whatsapp,
                city,
                uf,
            };
    
            try{
                setLoading(true);
                const response = await api.post('ongs', data);
                alert(`Seu ID de acesso: ${response.data.id}`);
                setLoading(false);
                history.push('/');
            }catch(err){
                alert('Erro ao cadastrar ong');
                setLoading(false);
            }
        }

    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <p className="validation">{validationName}</p>

                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <p className="validation">{validationEmail}</p>
                    
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <p className="validation">{validationWhatsapp}</p>
                   
                    <div className="input-group">

                        <div className="field-city">
                            <input 
                                placeholder="Cidade"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />

                            <p className="validation">{validationCity}</p>
                        </div>
                        

                        
                    <div className="field-uf">
                        <input 
                            placeholder="UF"
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            style={{ width: 80 }} 
                            maxLength="2"
                        />
                        
                        
                            <p className="validation" style={{ marginLeft: 21 }} >{validationUf}</p>
                        </div>
                        
                        
                    </div>
                    {loading ? 
                        <button className="button" type="submit">
                            <FiLoader size={22} color="#0000000" style={{ marginTop: 19 }}></FiLoader>
                        </button>
                    :
                        <button className="button" type="submit">Cadastrar</button>
                    }
                </form>
            </div>
        </div>
    );
}