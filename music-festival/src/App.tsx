import { Link} from 'react-router-dom';
import Main from './Main';

export default function App() {
  return (
    <>  
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/music'>Music Festivals</Link></li>
        </ul>
        <hr />
        <Main />
            
      </div>   
    </>
  )
}