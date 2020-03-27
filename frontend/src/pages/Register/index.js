import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';


import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import './styles.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        const data = { name, email, whatsapp, city, uf };

        try {
            const resp = await api.post('ong', data);
            alert(`Your ID: ${resp.data.id}`);
            history.push('/');
        } catch (ex) {
            alert(`Register Erro: ${ex}`)
        }

    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo" />

                    <h1>Register</h1>
                    <p>Register your ONG, help people find your cases.</p>

                    <Link className="backlink" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                       Home
                   </Link>

                </section>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type="text"
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input type="text"
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input type="text"
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUF(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">
                        Register
                    </button>

                </form>
            </div>
        </div>
    )
}
