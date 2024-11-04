import axios from 'axios';

export async function getComments(id_ticket)
{
    try
    {
        let response = await axios.get(`http://localhost:3334/commentsTickets?id_ticket=${id_ticket}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response.data;
    }
    catch(erro)
    {
        return [];
    }
}

export async function insertComments(data)
{
    try
    {
        let response = await axios.post(`http://localhost:3334/commentsTickets`, data , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response.data;
    }
    catch(erro)
    {
        return [];
    }
}

export async function getTickets(menu)
{
    try
    {
        let response = await axios.get(`http://localhost:3334/tickets`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                menu: menu
            }
        });

        return response.data;
    }
    catch(erro)
    {
        return [];
    }
}

export async function getInfoTicket(id_ticket)
{
    try
    {
        let response = await axios.get(`http://localhost:3334/getInfoTicket?id_ticket=${id_ticket}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response.data;
    }
    catch(erro)
    {
        return [];
    }
}

export async function updateTicket(data)
{
    try
    {
        let response = await axios.put(`http://localhost:3334/tickets`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response.data;
    }
    catch(erro)
    {
        return [];
    }
}

export async function createTicket(data)
{
    try
    {
        let response = await axios.post(`http://localhost:3334/tickets`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response.data;
    }
    catch(erro)
    {
        return [];
    }
}

export async function getInfoPerson()
{
    try
    {
        let response = await axios.get(`http://localhost:3334/getInfoPerson`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response.data;
    }
    catch(erro)
    {
        return [];
    }
}