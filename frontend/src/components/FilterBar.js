import { useDispatch } from "react-redux"
import { applyThisFilter } from "../reducers/filterReducer"

const FilterBar = () => {
    const dispatch = useDispatch()

    const applyFilter = (event) => {
        const content = event.target.value
        console.log(content)
        dispatch(applyThisFilter(content))
    }

    const style = {
        marginBottom: 35
    }

    return(
        <div style={style}>
            filter <input onChange={applyFilter}></input>
        </div>
    )
}

export default FilterBar