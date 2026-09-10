// IMPORTANTE: ajuste essa URL conforme onde você colocou a pasta "backend"
// dentro do htdocs do XAMPP. Exemplo: se a pasta do projeto está em
// C:\xampp\htdocs\livraria-livros, a URL fica assim:
const API_URL = 'http://localhost/livraria-livros/backend/api/livros.php';

const form = document.getElementById('form-livro');
const tabelaCorpo = document.getElementById('tabela-corpo');
const btnCancelar = document.getElementById('btn-cancelar');
const formTitulo = document.getElementById('form-titulo');

document.addEventListener('DOMContentLoaded', carregarLivros);

async function carregarLivros() {
  try {
    const resposta = await fetch(API_URL);
    const livros = await resposta.json();
    renderizarTabela(livros);
  } catch (erro) {
    console.error('Erro ao carregar livros:', erro);
    alert('Não foi possível carregar os livros. Verifique se o Apache/MySQL do XAMPP estão ligados e se a API_URL está correta.');
  }
}

function renderizarTabela(livros) {
  tabelaCorpo.innerHTML = '';
  livros.forEach((livro) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${livro.titulo}</td>
      <td>${livro.autor || '-'}</td>
      <td>${livro.categoria || '-'}</td>
      <td>R$ ${Number(livro.preco).toFixed(2)}</td>
      <td>${livro.quantidade_estoque}</td>
      <td>
        <button class="btn-editar" onclick="editarLivro(${livro.id})">Editar</button>
        <button class="btn-excluir" onclick="excluirLivro(${livro.id})">Excluir</button>
      </td>
    `;
    tabelaCorpo.appendChild(linha);
  });
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const id = document.getElementById('livro-id').value;
  const dados = {
    titulo: document.getElementById('titulo').value,
    preco: document.getElementById('preco').value,
    quantidade_estoque: document.getElementById('quantidade').value,
    // autor_id e categoria_id ficam de fora neste exemplo simples
  };

  try {
    if (id) {
      await fetch(`${API_URL}?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
    }

    form.reset();
    document.getElementById('livro-id').value = '';
    formTitulo.textContent = 'Cadastrar Livro';
    btnCancelar.style.display = 'none';
    carregarLivros();
  } catch (erro) {
    console.error('Erro ao salvar livro:', erro);
    alert('Erro ao salvar livro.');
  }
});

async function editarLivro(id) {
  try {
    const resposta = await fetch(`${API_URL}?id=${id}`);
    const livro = await resposta.json();

    document.getElementById('livro-id').value = livro.id;
    document.getElementById('titulo').value = livro.titulo;
    document.getElementById('preco').value = livro.preco;
    document.getElementById('quantidade').value = livro.quantidade_estoque;

    formTitulo.textContent = 'Editar Livro';
    btnCancelar.style.display = 'inline-block';
    window.scrollTo(0, 0);
  } catch (erro) {
    console.error('Erro ao buscar livro:', erro);
  }
}

async function excluirLivro(id) {
  if (!confirm('Tem certeza que deseja excluir este livro?')) return;

  try {
    await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
    carregarLivros();
  } catch (erro) {
    console.error('Erro ao excluir livro:', erro);
  }
}

btnCancelar.addEventListener('click', () => {
  form.reset();
  document.getElementById('livro-id').value = '';
  formTitulo.textContent = 'Cadastrar Livro';
  btnCancelar.style.display = 'none';
});
