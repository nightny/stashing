import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, ButtonGroup, Dropdown, Form } from 'react-bootstrap';

export default function Header() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { register, handleSubmit } = useForm({ defaultValues: { query } });
  const navigate = useNavigate();
  const doSearch = (data: any) => navigate(data.query ? `/?q=${data.query}` : '/');
  const doImport = (data: any) => navigate(data.query ? `/external?q=${data.query}` : '/external');
  const importE621 = (data: any) => navigate(data.query ? `/external/e621?q=${data.query}` : '/external/e621');
  const importNH = (data: any) => navigate(data.query ? `/external/nhentai?q=${data.query}` : '/external/nhentai');
  return <header>
    <Form onSubmit={handleSubmit(doSearch)}>
      <div className="d-flex flex-row align-items-center pb-3 mb-4 border-bottom border-secondary">
        <Link to="/" className="mx-3 d-flex align-items-center text-white text-decoration-none">
          <span className="fs-4">Stashing</span>
        </Link>
        <Form.Control type="text" placeholder="Search your stash..." {...register('query')}/>
        <Dropdown as={ButtonGroup} className="mx-3">
          <Button variant="secondary" type="submit">
            <i className="bi-search"/>
            <span className="visually-hidden">Search</span>
          </Button>
          <Dropdown.Toggle split variant="primary" id="dropdown-split-basic"/>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleSubmit(doImport)}>Import</Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item onClick={handleSubmit(importE621)}>E621 Import</Dropdown.Item>
            <Dropdown.Item onClick={handleSubmit(importNH)}>NH Import</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Form>
  </header>
}
