import './charList.scss';
import {Component} from "react"
import MarvelInfo from "../../services/request";
import Spinner from "../spinner/Spinner"

class CharList extends Component{

    constructor(props){
        super(props)
    }

    state = {
        char : [],
        loading: true
    }

    marvelInfo = new MarvelInfo()

    updateStateChar = (char) => {
        this.setState({
            char: char,
            loading: false
        })
    }

    componentDidMount() {
        this.marvelInfo.getAllCharacters().then(res => {
            this.updateStateChar(res)
        })
    }

    characterDataTransfer = (id) => {
        this.props.charInfo(id)
    }

    renderCharacterList = (char) => {
        return char.map(({id , name , thumbnail}) => {
            let cssStyleThumbnail = {"objectFit" : "cover"}

            if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                cssStyleThumbnail = {"objectFit": "contain"}
            }

            return (
                <li key={id} className="char__item" onClick={() => this.characterDataTransfer(id)}>
                    <img src={thumbnail} alt="abyss" style={cssStyleThumbnail}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
    }

    render(){
        const {char , loading} = this.state
        const character = this.renderCharacterList(char)
        const loadingInfo = loading ? <Spinner /> : null
        const content = !loading ? character : null

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {loadingInfo}
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;