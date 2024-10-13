export function formatResponseMenuTicket(ticketReponse, menu)
{
    let response = [];
    if(menu === 1)
    {
        ticketReponse.forEach((data, index) => {
           response[index] = {
                id: data['dataValues']['id'],
                title: data['dataValues']['title'],
                description: data['dataValues']['description'],
                category: data['dataValues']['category'][0]['dataValues']['category']['dataValues']['category'],
                priority: data['dataValues']['priority'][0]['dataValues']['priority']['dataValues']['priority'],
                accountable: data['dataValues']['personsTickets'][0]['dataValues']['accountable']['dataValues']['name'],
                company: {
                    company: data['dataValues']['departaments'][0]['dataValues']['departament']['dataValues']['relDepartament'][0]['dataValues']['branch']['relBranch'][0]['dataValues']['compan'],
                    departament: data['dataValues']['departaments'][0]['dataValues']['departament']['dataValues']['department_name'],
                    branch: data['dataValues']['departaments'][0]['dataValues']['departament']['dataValues']['relDepartament'][0]['dataValues']['branch']['branch_name']
                }
            };
        });
    }

    return response;
}