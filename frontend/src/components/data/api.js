import axios from 'axios';

export async function getComments(id_ticket)
{
    try
    {
        let response = await axios.get(`http://localhost:3333/commentsTickets?id_ticket=${id_ticket}`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzI4NjA0MjE5LCJleHAiOjE3Mjg2OTA2MTl9.8CLLcC5g74GiPAQPq2TxrVpjGgSFqLf-rkzbyNTDYyk`
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
        let response = await axios.post(`http://localhost:3333/commentsTickets`, data , {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzI4NjA0MjE5LCJleHAiOjE3Mjg2OTA2MTl9.8CLLcC5g74GiPAQPq2TxrVpjGgSFqLf-rkzbyNTDYyk`
            }
        });

        return response.data;
    }
    catch(erro)
    {
        return [];
    }
}