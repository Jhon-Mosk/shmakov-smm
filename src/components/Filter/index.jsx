import { useState } from "react"
import { useDispatch } from "react-redux";

import { createGroupsFiltered } from "../../store/main";

export default function Filter(groups) {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState('Все группы');

    const handleChange = (event) => {
        setSelected(event.target.value);
        dispatch(createGroupsFiltered(event.target.value, groups.groups));
    }

    return (
        <select value={selected} onChange={(event) => handleChange(event)}>
            <option value='all'>Все группы</option>
            <option value='admin'>admin</option>
            <option value='editor'>editor</option>
            <option value='moder'>moder</option>
            <option value='advertiser'>advertiser</option>
            <option value='groups'>groups</option>
            <option value='publics'>publics</option>
            <option value='events'>events</option>
            <option value='hasAddress'>hasAddress</option>
        </select>
    )
}
