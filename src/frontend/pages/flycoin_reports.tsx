import React, { useState } from 'react';
import { usePartners } from '../common/queries';
import { statuses } from '../common/utils';
import FlycoinReport from '../components/flycoin_report';
import { Card, Collapse, Container, Row, Spacer, Text } from '@nextui-org/react';
import LoadingScreen from '../components/loading_screen';

// imports for date range filter
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';

const FlycoinReports = () => {
    const { status: partnersStatus, data: partners } = usePartners();

    // get today and tomorrow's date
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);

    if (partnersStatus === statuses.loading) {
        return <LoadingScreen />;
    }

    // define selection range for filter
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
        showSelectionPreview: true
    };

    // TODO: change type
    const handleSelect = (date: any) => {
        setStartDate(date.selection.startDate);
        setEndDate(date.selection.endDate);
    };

    return (
        <>
            <Container md>
                <Spacer y={3} />
                <Card>
                    <Card.Header>
                        <Row justify={'center'}>
                              <Text h1>Flycoin Partner Reports</Text>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Collapse.Group accordion={false}>
                            <Collapse title={'filter by date'}>
                                <DateRangePicker
                                    ranges={[selectionRange]}
                                    onChange={handleSelect}
                                    minDate={new Date('2022-05-13')}
                                    maxDate={tomorrow}
                                />
                            </Collapse>
                            {partners.map((partner: any) => (
                                <Collapse key={partner.ID} title={partner.name}>
                                    <FlycoinReport
                                        partner={partner}
                                        startDate={startDate}
                                        endDate={endDate}
                                    ></FlycoinReport>
                                </Collapse>
                            ))}
                        </Collapse.Group>
                    </Card.Body>
                </Card>
                <Spacer y={4} />
            </Container>
        </>
    );
};

export default FlycoinReports;
