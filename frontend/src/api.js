import axios from "axios";

const URL = "https://mern-blog-5zdq.onrender.com"
export default async function getPosts(){
    const response = await axios.get(`${URL}/posts`)

    if (response.status === 200)
    {
        return response.data
    }
    else
    {
        return    
    }

}

// src/api.js
export async function getPost(id) {
    try {
        const response = await axios.get(`${URL}/posts/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Post not found");
            return null;
        }
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}


export async function createPost(post){

    const response = await axios.post(`${URL}/posts`, post)
    return response;
    
}

export async function updatePost(id, post){
    const response = await axios.put(`${URL}/posts/${id}`, post)
    return response;
    
}

export async function deletePost(id){
    const response = await axios.delete(`${URL}/posts/${id}`)

    return response

    
}

//USERS
export async function getUser(id) {
    try {
        const response = await axios.get(`${URL}/users/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("User not found");
            return null;
        }
    } catch (error) {
        console.error("Error fetching User:", error);
        return null;
    }
}


export async function createUser(user){

    const response = await axios.post(`${URL}/users`,  user)
    return response;
    
}

export async function updateUser(id, user){
    const response = await axios.put(`${URL}/users/${id}`, user)
    return response;
    
}

export async function verifyUser(user) {
    const response = await axios.post(`${URL}/users/login`, user);
  
    if (response.data.success) {
      return response.data.token;
    } else {
      throw new Error(response.data.message || response.statusText);
    }
  }
  
