import './App.css';
import {FormGroup, Label, Input, Button, Table, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import Search from './assets/search.svg'

function App() {
  return (
    <div className="App container mt-4">
      <h4>Example With Search and Filter</h4>
      <div className="d-flex flex-row mt-4">
        <FormGroup className="me-4">
          <Label for="exampleEmail">
            Search
          </Label>
          <div className="d-flex flex-row">
          <Input
            className="standard-input"
            id="search"
            name="text"
            placeholder="Search"
            type="text"
          />
          <Button className="ms-3" color="primary">
            <img alt="Search" color="search-logo" src={Search}/>
          </Button>
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="gender">
            Gender
          </Label>
          <div className="d-flex flex-row">
          <Input
              className="standard-input"
              id="exampleSelect"
              name="select"
              type="select"
            >
              <option value="all">
                All
              </option>
              <option value="male">
                Male
              </option>
              <option value="female">
                Female
              </option>
            </Input>
            <Button className="ms-3" color="light" variant="outline">
              Reset Filter
            </Button>
          </div>
        </FormGroup>
      </div>
      <Table borderless   className="mt-5">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Registered Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Test 12345</td>
            <td>Haha Hehe</td>
            <td>hehe@hehe.com</td>
            <td>Male</td>
            <td>2010-10-02</td>
          </tr>
          <tr>
            <td>Test 12345</td>
            <td>Haha Hehe</td>
            <td>hehe@hehe.com</td>
            <td>Male</td>
            <td>2010-10-02</td>
          </tr>
          <tr>
            <td>Test 12345</td>
            <td>Haha Hehe</td>
            <td>hehe@hehe.com</td>
            <td>Male</td>
            <td>2010-10-02</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mt-5">
        <Pagination>
          {[1,2,3,4,5].map(i => (
            <PaginationItem>
              <PaginationLink href="#">
                {i}
              </PaginationLink>
            </PaginationItem>
          ))}
        </Pagination>
      </div>
    </div>
  );
}

export default App;
