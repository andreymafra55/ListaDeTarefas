const express = require("express");

const router = express.Router();

const Checklist = require("../models/checklist");

router.get("/", async (req, res) => {
  try {
    let checklists = await Checklist.find({}).populate('tasks');
    res.status(200).render("checklists/index", { checklists: checklists });
  } catch (error) {
    res
      .status(200)
      .render("pages/error", { error: "Error ao exibir as listas" });
  }
});

router.get("/new", async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render("checklists/new", { checklist: checklist });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { errors: "Erro ao carregar o formulario" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id).populate('tasks');
    res.status(200).render("checklists/show", { checklist: checklist });
  } catch (error) {
    res
      .status(200)
      .render("pages/error", { error: "Error ao exibir as listas de tarefas" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render("checklists/edit", { checklist: checklist });
  } catch (error) {
    res
      .status(200)
      .render("pages/error", {
        error: "Error ao exibir a edição listas de tarefas",
      });
  }
});

router.post("/", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({ name });
  try {
    await checklist.save();
    res.redirect("/checklists");
  } catch (error) {
    res
      .status(422)
      .render("checklists/new", { checklist: { ...checklist, error } });
  }
});

router.put("/:id", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = await Checklist.findById(req.params.id);
  try {
    let checklist = await Checklist.updateOne({ name });
    res.redirect('/checklists')
  } catch (error) {
   let errors = error.erros;
   res.status(422).render('checklists/edit',{checklist:{...checklist,errors}})
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findOneAndRemove(req.params.id);
    res.redirect('/checklists')
  } catch (error) {
    res
    .status(200)
    .render("pages/error", {
      error: "Error ao exibir a deletar a  lista de tarefas",
    });
  }
});

module.exports = router;
