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

    const expFinishAt = (ticketResponse['dataValues']['exp_finish_at'] === null || ticketResponse['dataValues']['exp_finish_at'] == "2000-12-31" )? '00/00/0000' : new Date(ticketResponse['dataValues']['exp_finish_at']);
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
        persons: {
            accountable: {
                id: ticketResponse['dataValues']['personsTickets'][0]['dataValues']['accountable']['dataValues']['id'],
                name: ticketResponse['dataValues']['personsTickets'][0]['dataValues']['accountable']['dataValues']['name']
            },
            creator: {
                id: ticketResponse['dataValues']['personsTickets'][0]['dataValues']['creator']['dataValues']['id'],
                name: ticketResponse['dataValues']['personsTickets'][0]['dataValues']['creator']['dataValues']['name']
            }
        },
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

export function formatResponsePerson(personResponse)
{
    let response = [];

    response = {
        id: personResponse['dataValues']['id'],
        name: personResponse['dataValues']['name'],
        lastname: personResponse['dataValues']['lastname'],
        telephone: personResponse['dataValues']['telephone'],
        office: personResponse['dataValues']['office'],
        profile_photo: personResponse['dataValues']['profile_photo'],
        person_activy: personResponse['dataValues']['person_activy'],
        user: {
            username: personResponse['dataValues']['user']['username'],
            email: personResponse['dataValues']['user']['email'],
        },
        category: personResponse['dataValues']['category'][0]['dataValues']['category']['dataValues']['category'],
        company: {
            company: personResponse['dataValues']['departaments'][0]['dataValues']['departaments']['dataValues']['relDepartament'][0]['dataValues']['branch']['relBranch'][0]['dataValues']['compa'],
            departament: {
                name: personResponse['dataValues']['departaments'][0]['dataValues']['departaments']['dataValues']['department_name'],
                id: personResponse['dataValues']['departaments'][0]['dataValues']['departaments']['dataValues']['id']
            },
            branch: personResponse['dataValues']['departaments'][0]['dataValues']['departaments']['dataValues']['relDepartament'][0]['dataValues']['branch']['branch_name']
        }
    };

    return response;
}

export function formatResponsePersonByBranch(personResponse)
{
    let response = [];

    personResponse.forEach((data, index) => {

        response[index] = {
            id: data['dataValues']['id'],
            name: data['dataValues']['name'],
            lastname: data['dataValues']['lastname'],
            telephone: data['dataValues']['telephone'],
            office: data['dataValues']['office'],
            profile_photo: data['dataValues']['profile_photo'],
            person_activy: data['dataValues']['person_activy'],
            user: {
                username: data['dataValues']['user']['username'],
                email: data['dataValues']['user']['email'],
            },
            category: data['dataValues']['category'][0]['dataValues']['category']['dataValues']['category'],
            company: {
                company: data['dataValues']['departaments'][0]['dataValues']['departaments']['dataValues']['relDepartament'][0]['dataValues']['branch']['relBranch'][0]['dataValues']['compa'],
                departament: {
                    name: data['dataValues']['departaments'][0]['dataValues']['departaments']['dataValues']['department_name'],
                    id: data['dataValues']['departaments'][0]['dataValues']['departaments']['dataValues']['id']
                },
                branch: data['dataValues']['departaments'][0]['dataValues']['departaments']['dataValues']['relDepartament'][0]['dataValues']['branch']['branch_name']
            }
        };
     });


    return response;
}

export function formatResponseHardwareAsset(hardwareAssetResponse)
{
    let response = [];

    hardwareAssetResponse.forEach((data, index) => {

        response[index] = {
            patrimony_number: data['dataValues']['patrimony_number'],
            brand: data['dataValues']['brand'],
            model: data['dataValues']['model'],
            status: data['dataValues']['statusAsset']['status'],
            category: data['dataValues']['subcategoryHardware']['subcategory'],
            company: {
                company: data['dataValues']['branch']['relBranch'][0]['dataValues']['company']['name'],
                branch: data['dataValues']['branch']['branch_name']
            }
        }
     });


    return response;
}

export function formatResponseOneHardwareAsset(hardwareAsset)
{
    let response = [];
    response = {
        patrimony_number: hardwareAsset[0]['dataValues']['patrimony_number'],
        status: hardwareAsset[0]['dataValues']['id_status'],
        category: hardwareAsset[0]['dataValues']['id_subcategory'],
        brand: hardwareAsset[0]['dataValues']['brand'],
        model: hardwareAsset[0]['dataValues']['model'],
        ip_address: hardwareAsset[0]['dataValues']['ip_address'],
        mac_address: hardwareAsset[0]['dataValues']['mac_address'],
        network_mac_address: hardwareAsset[0]['dataValues']['network_mac_address'],
        location: hardwareAsset[0]['dataValues']['location'],
        ipv6: hardwareAsset[0]['dataValues']['ipv6'],
        ipv4: hardwareAsset[0]['dataValues']['ipv4'],
        description: hardwareAsset[0]['dataValues']['description'],
        serial_number: hardwareAsset[0]['dataValues']['serial_number'],
        location: hardwareAsset[0]['dataValues']['location'],
        person: hardwareAsset[0]['dataValues']['id_person'],
        company: {
            company: hardwareAsset[0]['dataValues']['branch']['relBranch'][0]['dataValues']['company']['id'],
            branch: hardwareAsset[0]['dataValues']['id_branch']
        }
    }

    return response;
}

export function formatResponseServerAsset(serverAssetResponse)
{
    let response = [];

    serverAssetResponse.forEach((data, index) => {

        response[index] = {
            patrimony_number: data['dataValues']['patrimony_number'],
            name: data['dataValues']['name'],
            host: data['dataValues']['host'],
            category: data['dataValues']['categoryServer']['category'],
            status: data['dataValues']['serverStatusAsset']['status'],
            company: {
                company: data['dataValues']['serverBranch']['relBranch'][0]['dataValues']['company']['name'],
                branch: data['dataValues']['serverBranch']['branch_name']
            }
        }
     });


    return response;
}

export function formatResponsePersonTechnical(personTechnicalResponse)
{
    let response = [];

    personTechnicalResponse.forEach((data, index) => {
        response[index] = {
            id_person: data['dataValues']['id'],
            name: data['dataValues']['name'],
        }
     });

    return response;
}

export function formatResponseServerMonitoring(serverMonitoringResponse)
{
    let response = [];
    
    serverMonitoringResponse.forEach((data, index) => {
        response[index] = {
            patrimony_number: data['dataValues']['serverAsset']['patrimony_number'],
            name: data['dataValues']['serverAsset']['name'],
            status: data['dataValues']['status'],
            host: data['dataValues']['serverAsset']['host'],
            alert: (!data['dataValues']['alert'] || (typeof data['dataValues']['alert'] === 'string' && data['dataValues']['alert'].length < 1)) ? "N/A" : data['dataValues']['alert'],
            company: {
                branch: data['dataValues']['serverAsset']['serverBranch']['dataValues']['branch_name'],
                company: data['dataValues']['serverAsset']['serverBranch']['dataValues']['relBranch'][0]['dataValues']['company']['name']
            }
        }
     });

    return response;
}