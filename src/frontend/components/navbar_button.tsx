import React from 'react';
import { Button, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';

class NavbarButtonProps {
    selected: boolean;
    labelText: string;
    destination: string;
    labelIcon: any;

    constructor(selected: boolean, labelText: string, destination: string, labelIcon: any) {
        this.selected = selected;
        this.labelText = labelText;
        this.destination = destination;
        this.labelIcon = labelIcon;
    }
}

const NavbarButton = ({ selected, labelText, destination, labelIcon }: NavbarButtonProps) => {
    const router = useRouter();

    return (
        <>
            <Button
                auto
                ghost
                color={'gradient'}
                icon={labelIcon}
                css={{ margin: 'auto' }}
                onClick={() => router.push('/' + destination)}
            >
                <Row justify={'center'} align={'center'}>
                    <Text
                        css={
                            selected
                                ? {
                                      textGradient: '180deg, #4375BD 0%, #4D9DD9 100%'
                                  }
                                : {}
                        }
                    >
                        {labelText}
                    </Text>
                </Row>
            </Button>
        </>
    );
};

export default NavbarButton;
