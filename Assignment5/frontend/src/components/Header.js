import React, { useEffect, useState } from 'react';
import '../styles/header_footer_style.css';

function Header({pageName}) {
    return (
        <div>
            <header>
                <h1>{pageName}</h1>
            </header>
        </div>
    );
}

export default Header;