import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';

export default function Header() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { register, handleSubmit } = useForm({ defaultValues: { query } });
  const navigate = useNavigate();
  return <header>
    <Form onSubmit={handleSubmit((data) => navigate(data.query ? `/?q=${data.query}` : "/"))}>
      <div className="d-flex flex-row align-items-center pb-3 mb-4 border-bottom border-secondary">
        <Link to="/" className="mx-3 d-flex align-items-center text-white text-decoration-none">
          <span className="fs-4">Stashing</span>
        </Link>
        <Form.Control type="text" placeholder="Search your stash..." {...register("query")}/>
        <Button variant="secondary" type="submit" className="mx-3">
          <i className="bi-search"/>
          <span className="visually-hidden">Search</span>
        </Button>
      </div>
    </Form>
  </header>
}
