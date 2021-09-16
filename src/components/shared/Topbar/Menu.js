import styled from "styled-components"
import UserImage from "../UserImage";
import { ChevronDown, ChevronUp } from 'react-ionicons'
import { useContext, useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";

export default function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { setUserData } = useContext(UserContext);
    let history = useHistory();
    let ref = useRef();

    // Fechar ao clicar fora
    useEffect(() => {
        function checkIfClickedOutside(e) {
            // Se o menu esta aberto e o target clickado não esta no menu, feche o menu
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Limpando event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])

    function logout() {
        setUserData(null);
        history.push("/");
    }

    return (
        <UserMenuBox ref={ref} onClick={() => setIsMenuOpen(!isMenuOpen)} >
            {isMenuOpen ?
                (<ChevronUp color={'#00000'} height="30px" width="30px" />) :
                (<ChevronDown color={'#00000'} height="30px" width="30px" />)
            }

            <UserImage width="53px" height="53px" />
            {isMenuOpen ?
                (<OptionBox >
                    <Link to="/my-posts" ><li>My posts</li></Link>
                    <Link to="/my-likes" ><li>My likes</li></Link>
                    <li onClick={logout}>Logout</li>
                </OptionBox>) : ""
            }

        </UserMenuBox>
    )
}

const UserMenuBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    z-index: 10;
`;

const OptionBox = styled.ul`
    width: 133px;
    height: 107px;
    background-color: #171717;
    border-radius: 0px 0px 0px 20px;
    position: absolute;
    bottom: -116px;
    right: -20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 17px 0;
    li {
        font-weight: bold;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        cursor: pointer;
    }

    @media (max-width) {
        width: 130px;
        height: 97px;
    }
`;