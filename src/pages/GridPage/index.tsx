import { Col, Image, Row } from 'react-bootstrap';
import logo from '../../logo.svg';
import './index.scss';

export default function GridPage() {
  return <Row>
    <Col md={{ order: 'last' }}>
      <Row xs="1" sm="2" md="3" lg="4" xl="5" xxl="6">
        {[...new Array(100)].map((_, index) => (
          <Col key={index}>
            <Image fluid src={logo} alt="test"/>
            <div className="text-center">Test image</div>
          </Col>
        ))}
      </Row>
    </Col>
    <Col md={{ order: 'first' }} className={"col-sidebar-span"}>
      This is the sidebar
    </Col>
  </Row>
}
