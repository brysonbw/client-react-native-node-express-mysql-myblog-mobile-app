import { useQuery } from 'react-query';
import axios from 'axios';

const getBlogs = async () => {
    const { data } = await axios.get('https://myblog-app-api.herokuapp.com/api/blogs/all');
    return data;
};

export const useBlogs = () => useQuery('blogs', getBlogs);
