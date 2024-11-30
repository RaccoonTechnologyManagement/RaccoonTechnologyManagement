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

export async function getCompanys()
{
    try
    {
        let response = await axios.get(`http://localhost:3334/companys`, {
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

export async function getBranchesByCompany(id_company)
{
    try
    {
        let response = await axios.get(`http://localhost:3334/getBranchesByCompany?id_company=${id_company}`, {
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

export async function getPersonByBranch(id_branch)
{
    try
    {
        let response = await axios.get(`http://localhost:3334/persons?id_branch=${id_branch}`, {
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

export async function createAssetHardware(data)
{
    try
    {
        let response = await axios.post(`http://localhost:3334/hardwareAsset`, data, {
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

export async function getAssetHardware()
{
    try
    {
        let response = await axios.get(`http://localhost:3334/hardwareAsset`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });

        return response.data;
    }
    catch(erro)
    {
        return [];
    }
}

export async function getAssetServer()
{
    try
    {
        let response = await axios.get(`http://localhost:3334/serverAsset`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });

        return response.data;
    }
    catch(erro)
    {
        return [];
    }
}

export async function getPersonsTechnical(menu)
{
    try
    {
        let response = await axios.get(`http://localhost:3334/getPersonTechnical`, {
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

export async function createAssetServer(data)
{
    try
    {
        let response = await axios.post(`http://localhost:3334/serverAsset`, data, {
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

export async function getServerAssetMonitoring()
{
    try
    {
        let response = await axios.get(`http://localhost:3334/serverMonitoring`, {
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

export async function getInfoHardwareAsset(patrimony_number)
{
    try
    {
        let response = await axios.get(`http://localhost:3334/hardwareAssetOne?patrimony_number=${patrimony_number}`, {
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

    export async function deleteOneHardwareAsset(patrimony_number)
    {
        try
        {
            let response = await axios.delete(`http://localhost:3334/hardwareDelete?patrimony_number=${patrimony_number}`, {
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