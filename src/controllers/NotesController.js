const knex = require("../database/knex");

class NotesController {
  //CRIAR NOTA
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const user_id = request.user.id;

    //INSERIR A NOTA
    const note_id = await knex("notes").insert({
      title,
      description,
      user_id,
    });

    //para cada link ele vai inserir
    const linksInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      };
    });

    //INSERIR LINKS
    await knex("links").insert(linksInsert);

    //para cada tag ele vai inserir
    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    //INSERIR TAGS
    await knex("tags").insert(tagsInsert);

    return response.json();
  }

  //APRESENTAR NOTA
  async show(request, response) {
    const { id } = request.params;

    //filtrando a nota requerida
    const note = await knex("notes").where({ id }).first();
    //filtrando as tags da referida nota
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    //filtrando os links da referida nota
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_at");

    return response.json({ ...note, tags, links });
  }

  //DELETAR NOTA
  async delete(request, response) {
    const { id } = request.params;

    //deletar
    await knex("notes").where({ id }).delete();

    return response.json();
  }

  //LISTAR AS NOTAS
  async index(request, response) {
    const { title, tags } = request.query;

    const user_id = request.user.id;

    let notes;

    //Se existe uma consulta por tags
    if (tags) {
      //convertendo o array em texto, separando as tags por vírgula
      const filterTags = tags.split(",").map((tag) => tag.trim());

      //pesquisar as notas baseado nas tags
      notes = await knex("tags")
        //selecionando os campos da tabela (tabela.campo)
        .select(["notes.id", "notes.title", "notes.user_id"])
        .where("notes.user_id", user_id) //Filtrar pelo id do usuário
        .whereLike("notes.title", `%${title}%`) //realizando pesquisa por valor aproximado
        .whereIn("name", filterTags)
        //conectando notas com as tags
        .innerJoin("notes", "notes.id", "tags.note_id")
        .groupBy("notes.id") //não retornar notas repetidas
        .orderBy("notes.title"); //ordenar por título
    } else {
      notes = await knex("notes")
        .where({ user_id }) //pesquisar pelo id do usuário
        .whereLike("title", `%${title}%`) //Para peqquisar por qualquer valor aproximado independete de colocar o texto todo
        .orderBy("title"); //organizar por título
    }

    //FILTRAR POR TAGS
    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    response.json(notesWithTags);
  }
}

module.exports = NotesController;
