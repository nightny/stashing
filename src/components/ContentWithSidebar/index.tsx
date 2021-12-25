import { Col, Row } from 'react-bootstrap';
import { ReactNode } from 'react';
import './index.scss';

export interface Props {
  sidebar: ReactNode;
  children: ReactNode;
  thickness: '200' | '250';
}

export default function ContentWithSidebar({ children, sidebar, thickness }: Props) {
  return <Row>
    <Col md={{ order: 'last' }}>
      {children}
    </Col>
    <Col md={{ order: 'first' }} className={`col-sidebar-${thickness}`}>{sidebar}</Col>
  </Row>;
}
