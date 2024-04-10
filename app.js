let participantes = [
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 22, 19, 20)
  },
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 21, 10, 20),
    dataCheckIn: new Date(2024, 2, 12, 9, 20)
  },
  {
    nome: "Fulano de Tal",
    email: "fulano@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 10, 30),
    dataCheckIn: new Date(2024, 2, 20, 14, 45)
  },
  {
    nome: "Ciclano da Silva",
    email: "ciclano@gmail.com",
    dataInscricao: new Date(2024, 2, 15, 16, 45),
    dataCheckIn: new Date(2024, 2, 21, 9, 10)
  },
  {
    nome: "Beltrano Oliveira",
    email: "beltrano@gmail.com",
    dataInscricao: new Date(2024, 2, 12, 11, 20),
    dataCheckIn: new Date(2024, 2, 24, 18, 30)
  },
  {
    nome: "João da Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 17, 13, 40),
    dataCheckIn: new Date(2024, 2, 25, 10, 15)
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 8, 15),
    dataCheckIn: new Date(2024, 2, 26, 17, 20)
  },
  {
    nome: "José Santos",
    email: "jose@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 19, 50),
    dataCheckIn: new Date(2024, 2, 27, 11, 40)
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 22, 30),
    dataCheckIn: new Date(2024, 2, 28, 14, 55)
  },
  {
    nome: "Carla Oliveira",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 17, 10),
    dataCheckIn: new Date(2024, 2, 29, 9, 25)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {  
    dataCheckIn = `
      <button 
       data-email="${participante.email}"
       onclick="fazerCheckIn(event)"
       >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target) 

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // Verificar se o participante ja existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Não é possível realizar a inscrição com um email ja cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // Limpar formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // Confirmar se realmente quer fazer o check in
  const msgConfirmacao = 'Tem certeza de que realmente deseja realizar o check in?';

  if(confirm(msgConfirmacao) == false) {
    return
  }

  // Encontrar o participante dentro da lista
  const participante = participantes.find((p) =>
    p.email == event.target.dataset.email
  )

  // Atualizar o check in do participante
  participante.dataCheckIn = new Date()

  // Atualizar a lista de participante
  atualizarLista(participantes)
}

