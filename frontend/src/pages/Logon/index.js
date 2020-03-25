import  React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api';

import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import { FiLogIn } from 'react-icons/fi'

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        
        try {
            const resp = await api.post('session', { id })

            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',resp.data.ong.name);

            //Navigation
            history.push('/profile');
        } catch (err) {
            console.log(err);
        }
    }

    return (
       <div className="logon-containner">
           <section className="form">
               <img src={logoImg} alt="logo" />


               <form onSubmit={handleLogin}>
                   <h1>Login</h1>
                   <input 
                        placeholder="Your Id" 
                        type="text"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                   <button 
                        className="button"
                        type="submit">
                        Enter
                    </button>

                   <Link className="backlink" to="/register">
                       <FiLogIn size={16} color="#E02041" />
                       I want to Join!
                   </Link>
               </form>
           </section>
           <img src={heroesImg} alt="heroes" />
       </div>
    )
}