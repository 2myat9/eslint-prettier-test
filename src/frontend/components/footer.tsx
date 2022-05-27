import React from 'react';
import { Row, Spacer } from '@nextui-org/react';

const Footer = () => {
    return (
          <footer
            style={{
                position: 'fixed',
                bottom: '0px',
                width: '100%',
                backgroundColor: 'white',
                padding: '5px',
                zIndex: '2'
            }}>
            <Row justify={'space-between'}>
                <div style={{ display: 'inline-block', paddingLeft: '40px' }}>
                    All Rights Reserved. Flycoin 2022
                </div>
                <div style={{ display: 'inline-block', paddingRight: '40px' }}>
                    <Row>
                        <a href="https://flycoin.org/terms-and-conditions/user-agreement/">
                            User Agreement
                        </a>
                        <Spacer x={2} />
                        <a href="https://flycoin.org/terms-and-conditions/card/">
                            Terms and Conditions
                        </a>
                    </Row>
                </div>
            </Row>
        </footer>
    );
};

export default Footer;
