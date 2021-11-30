import { useQuery } from 'react-query';
import axios from 'axios';

const getBlog = async (id) => {
    const { data } = await axios.get(`https://myblog-app-api.herokuapp.com/api/blogs/byId/${id}`);
    return data;
};

const useBlog = (id) => useQuery([ 'blog', id ], () => getBlog(id));
export default useBlog;