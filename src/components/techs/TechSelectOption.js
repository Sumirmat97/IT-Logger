import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTechs } from '../../actions/techActions';

const TechSelectOption = ({tech: {techs, loading}, getTechs}) => {
  
    useEffect(() => {
        const getData = async () => {
            await getTechs();
        }
        getData();
        // eslint-disable-next-line
    }, []);
  
  
    return ( 
        !loading
        && techs !== null 
        && techs.map(t => (<option key={t.id} value={`${t.firstName} ${t.lastName}`}> {t.firstName} {t.lastName}  </option>)) 
  );
}

TechSelectOption.propTypes = {
    tech: PropTypes.object.isRequired,
    getTechs: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    tech: state.tech
});


export default connect(mapStateToProps, { getTechs }) (TechSelectOption);