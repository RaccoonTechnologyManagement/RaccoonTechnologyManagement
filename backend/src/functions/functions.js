export function formatResponseMenuTicket(ticketResponse)
{
    let response = [];

    ticketResponse.forEach((data, index) => {

        const expFinishAt = new Date(data['dataValues']['exp_finish_at']);
        const formattedExpFinishAt = expFinishAt.toLocaleDateString('pt-BR');

        response[index] = {
            id: data['dataValues']['id'],
            title: data['dataValues']['title'],
            dateExp: formattedExpFinishAt,
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

    return response;
}

export function formatResponseTicket(ticketResponse)
{
    let response = [];

    const expFinishAt = ticketResponse['dataValues']['exp_finish_at'] === null ? '00/00/0000' : new Date(ticketResponse['dataValues']['exp_finish_at']);
    const formattedExpFinishAt = expFinishAt == '00/00/0000' ? expFinishAt : expFinishAt.toLocaleDateString('pt-BR');

    const createdAt = new Date(ticketResponse['dataValues']['createdAt']);
    const formattedCreatedAt = createdAt.toLocaleDateString('pt-BR');

    response = {
        id: ticketResponse['dataValues']['id'],
        title: ticketResponse['dataValues']['title'],
        dateExp: formattedExpFinishAt,
        dateCreated: formattedCreatedAt,
        description: ticketResponse['dataValues']['description'],
        category: ticketResponse['dataValues']['category'][0]['dataValues']['category']['dataValues']['id'],
        priority: ticketResponse['dataValues']['priority'][0]['dataValues']['priority']['dataValues']['id'],
        status: ticketResponse['dataValues']['status'][0]['dataValues']['status']['dataValues']['id'],
        accountable: ticketResponse['dataValues']['personsTickets'][0]['dataValues']['accountable']['dataValues']['name'],
        creator: ticketResponse['dataValues']['personsTickets'][0]['dataValues']['creator']['dataValues']['name'],
        company: {
            company: ticketResponse['dataValues']['departaments'][0]['dataValues']['departament']['dataValues']['relDepartament'][0]['dataValues']['branch']['relBranch'][0]['dataValues']['compan'],
            departament: ticketResponse['dataValues']['departaments'][0]['dataValues']['departament']['dataValues']['department_name'],
            branch: ticketResponse['dataValues']['departaments'][0]['dataValues']['departament']['dataValues']['relDepartament'][0]['dataValues']['branch']['branch_name']
        }
    };

    return response;
}

export function transformarDataEmTimestamp(dataStr)
{

    if(dataStr == "00/00/0000")
    {
        return '2024-01-01';
    }
    const partes = dataStr.split('/');
    if (partes.length !== 3) {
        throw new Error('Data inválida');
    }

    const dia = partes[0].padStart(2, '0');
    const mes = partes[1].padStart(2, '0');
    const ano = partes[2];

    return `${ano}-${mes}-${dia}`;

}