import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import backIcon from '../../Assets/images/icons/back.svg';
import logoIcon from '../../Assets/images/logo.svg';

interface PageHeaderProps {
    title: string,
    description?: string
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (

        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <img src={logoIcon} alt="proffy" />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                {props.description && <p> {props.description}</p>}
                {props.children}
            </div>

        </header>
    );
};

export default PageHeader;