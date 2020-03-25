import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import api from '../../services/api';
import {FiArrowLeft} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

import './styles.css';

export default function NewIncident() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [value, setValue] = useState();
    const ongId = localStorage.getItem('ongId')
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            await api.post('incident', {title, description, value}, {
            headers : {
                Authorization : ongId
            }});

            localStorage.setItem('ongId',ongId);
            history.push('/profile');

        } catch (err) {
            console.log(err);
            alert("Error :'(")
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo" />

                    <h1>Register New Case</h1>
                    <p>Describe in detail the specific case you want to report.</p>

                    <Link className="backlink" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                       Home
                   </Link>

                </section>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={title} 
                        placeholder="Title" 
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        name="description" 
                        value={description} 
                        id="casedescription" cols="30" rows="10" 
                        placeholder="Description"
                        onChange={e => setDescription(e.target.value)}>
                    </textarea>
                    <input 
                        type="text" 
                        value={value} 
                        placeholder="Value"
                        onChange={e => setValue(e.target.value)}
                    />

                    <button 
                        className="button" 
                        type="submit">
                        Register
                    </button>

                </form>
            </div>
        </div>
    )
}
