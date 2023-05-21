import React, { useEffect, useState } from 'react';
import axios from "axios"
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';

const Logs = () => {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState([]);
  

    useEffect(() => {
        const getData = async () => {
            await getLogs();
        }
        getData();
        // eslint-diable-next-line
    }, [])

  const getLogs = async () => {
    setLoading(true);
    const res = await axios.get("/logs");

    setTimeout(() => {
        setLogs(res.data);
        setLoading(false);}, 500)
    }

  if(loading) {
    return <Preloader/>
  }
  
  return ( 
    <ul className='collection with-header'> 
        <li className='collection-header'>
            <h4 className='center'>System Logs</h4>
        </li>
        {!loading && logs.length === 0 ? (
                <p className='center'> No Logs to display...  </p>
            ) : (
            logs.map(log => <LogItem log={log} key={log.id} />)
        )}
    </ul>

   );
}

export default Logs;