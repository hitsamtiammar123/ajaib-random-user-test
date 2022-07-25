import { useEffect, useState } from 'react';
import { 
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import Search from './assets/search.svg'
import Loading from './assets/loading.svg';
import { useAxios, usePrevious } from './hooks';
import './App.css';

const GENDER_DATA = [
  {
    id: 1,
    label: 'All',
    value: 'all',
  },
  {
    id: 2,
    label: 'Male',
    value: 'male'
  },
  {
    id: 3,
    label:'Female',
    value: 'female'
  }
];

const RESULTS = 10;

function App() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});
  const [selectedGender, setSelectedGender] = useState(GENDER_DATA[0]);
  const api = useAxios('/');

  const prevStatus = usePrevious(api.status);

  useEffect(() => {
    api.callApi({
      page,
      results: RESULTS
    })
  },[]);

  function fetchWithFilter(newFilter = filter, _page = null){
    api.callApi({
      page: _page !== null ? _page : page,
      results: RESULTS,
      ...newFilter
    })
  }

  function onSearchButtonClick(){
    const newFilter = {
      ...filter,
    }
    if(!searchText){
      delete newFilter.keyword
    }else{
      newFilter.keyword = searchText;
    }

    if(selectedGender.value === 'all'){
      delete newFilter.gender;
    }else{
      newFilter.gender = selectedGender.value;
    }

    setPage(1);
    setFilter(newFilter)
    fetchWithFilter(newFilter, 1);
  }

  function getName(user){
    let result = '';
    for(let key in user.name){
      result += `${user.name[key]} `;
    }
    return result;
  }

  useEffect(() => {
    if(prevStatus !== undefined && prevStatus !== api.status){
      switch(api.status){
        case 1:
          setData(api.response.results)
        break;
        case 0:
          alert('An error occured when loading data, please try again later');
          break;
        default:
      }
    }
  }, [prevStatus, api.status]);

  function onGenderChange(e){
    const index = e.target.selectedIndex;
    setSelectedGender(GENDER_DATA[index]);
  }

  function resetFilter(){
    setFilter({})
    setPage(1);
    fetchWithFilter({}, 1);
    setSearchText('');
    setSelectedGender(GENDER_DATA[0]);
  }

  function onPaginationChange(i){
    setPage(i);
    fetchWithFilter(filter, i);
  }

  function renderContent(){
    if(api.loading){
      return (
        <div className="d-flex align-items-center justify-content-center">
          <img src={Loading} alt="Loading" />
        </div>
      )
    }
    return (
      <>
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
          {data.map(d => (
            <tr key={d.idvalue}>
              <td>{d.login.username}</td>
              <td>{getName(d)}</td>
              <td>{d.email}</td>
              <td>{d.gender}</td>
              <td>{d.dob.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mt-5">
        <Pagination>
          {[1,2,3,4,5].map(i => (
            <PaginationItem active={i === page}>
              <PaginationLink onClick={() => onPaginationChange(i)} href="#">
                {i}
              </PaginationLink>
            </PaginationItem>
          ))}
        </Pagination>
      </div>
      </>
    )
  }

  return (
    <div className="App container mt-4">
      <h4>Example With Search and Filter</h4>
      <div className="d-flex flex-row mt-4 col-12">
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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button onClick={onSearchButtonClick} className="ms-3 standard-button" color="primary">
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
              value={selectedGender.value}
              onChange={onGenderChange}
            >
              {GENDER_DATA.map(item => (
                <option value={item.value}>
                  {item.label}
                </option>
              ))}
            </Input>
            <Button onClick={resetFilter} className="ms-3 standard-button" color="danger" variant="outline">
              Reset Filter
            </Button>
          </div>
        </FormGroup>
      </div>
      {renderContent()}
    </div>
  );
}

export default App;
