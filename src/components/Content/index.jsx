import "./style.css";

export default function Content(groups) {
    const getCoverUrl = (item) => {
        if (item.cover.enabled) {
            return item.cover.images.find(item => item.width === 1080).url;
        }

        return item.photo_200;
    };

    return (
        <div>
            {groups.groups.map((item) => {
                return (
                    <div className="group-item-wrap" key={item.id}>
                        <div className="group-item__info">
                            <a href={`https://vk.com/${item.screen_name}`} target='_blank' rel="noreferrer">{item.name}</a>
                            <span>{item.members_count}</span>
                        </div>
                        <img className="group-item__img" src={getCoverUrl(item)} alt={item.screen_name} />
                    </div>
                )
            })}
        </div>
    )
}
