import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MenuMore = ({expanded}: { expanded: boolean }) => {
    return (
        <ExpandMoreIcon className={`${expanded ? "expanded" : ""}`}/>
    )
}

export default MenuMore;