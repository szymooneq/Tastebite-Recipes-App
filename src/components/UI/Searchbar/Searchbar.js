import { useContext, useState } from "react"
import PropTypes from 'prop-types'
import ThemeContext from "../../../context/ThemeContext"

const propTypes = {
  onSearch: PropTypes.func.isRequired
}

function Searchbar(props) {
  const [term, setTerm] = useState('')
  const theme = useContext(ThemeContext)

  const search = () => {
    props.onSearch(term)
  }

  const onKeyDownHandler = e => {
    e.key === 'Enter' && search()
  }

  return (
    <div className="d-flex">
      <input
        value={term}
        onKeyDown={onKeyDownHandler}
        onChange={e => setTerm(e.target.value)}
        className="form-control"
        type="text" 
        placeholder="Szukaj" />

      <button
        onClick={search}
        className={`ms-1 btn btn-${theme.color}`}>Szukaj
      </button>
      
    </div>
  );
}

Searchbar.propTypes = propTypes;

export default Searchbar;