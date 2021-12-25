import { Col, Row } from 'react-bootstrap';
import { ReactNode } from 'react';

export interface ResponsiveGridProps {
  keyPrefix: string;
  childNodes: ReactNode[];
}

export default function ResponsiveGrid({ childNodes, keyPrefix }: ResponsiveGridProps) {
  return <Row xs="1" sm="2" md="3" lg="4" xl="5" xxl="6">
    {childNodes.map((value, index) => <Col key={`${keyPrefix}-${index}`}>{value}</Col>)}
  </Row>;
}
