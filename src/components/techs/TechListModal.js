import React, { useEffect, useState } from 'react';
import axios from "axios"
import TechItem from './TechItem';

const TechListModal = () => {
    const [loading, setLoading] = useState(false);
    const [techs, setTechs] = useState([]);
  

    useEffect(() => {
        const getData = async () => {
            await getTechs();
        }
        getData();
        // eslint-diable-next-line
    }, [])

  const getTechs = async () => {
        setLoading(true);
        const res = await axios.get("/techs");

        setTechs(res.data);
        setLoading(false);
    }

    return ( 
        <div id="tech-list-modal" className='modal'>
            <div className='modal-content'> 
                <h4> Technician List</h4>
                <ul className='collection'>
                    {!loading && techs.map(tech => <TechItem key={tech.id} tech={tech}/>)}
                </ul>
            </div>

        </div>
    );

}


export default TechListModal;