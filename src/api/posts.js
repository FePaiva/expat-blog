import axios from 'axios';

export default axios.create({
  // change URL in case go live with this project. 
    baseURL: 'http://localhost:3500'
});