import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg'
import './styles.css';

export default function Profile() {
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(resp => setIncidents(resp.data))
    }, [ongId])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incident/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(i => i.id !== id))
        } catch (err) {
            console.log(err);
        }
    }

    function handleLogOut() {
        localStorage.clear();
        history.push('/');
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Herp" />
                <span>{`Welcome, ${ongName}`}</span>

                <Link className="button" to="/incident/new">
                    Register New Case
                </Link>

                <button type="button" onClick={handleLogOut}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>List:</h1>

            <ul>
                {incidents.map(inc =>
                    (
                        <li key={inc.id}>
                            <strong>Name</strong>
                            <p>{inc.title}</p>

                            <strong>Description</strong>
                            <p>{inc.description}</p>

                            <strong>Valor:</strong>
                            <p>
                                {Intl.NumberFormat('pt-Pt', { style: 'currency', currency: 'EUR' }).format(inc.value)}
                            </p>

                            <button type="button" onClick={() => handleDeleteIncident(inc.id)}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    )
}
