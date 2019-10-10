PennController.ResetPrefix(null);

PennController.Sequence("consent", "instructions", "practice-message", "practice1", "practice2", randomize("experiment"), "questionnaire")

PennController("consent",
  newHtml("consent", "consent.html")
    .print()
  ,
  newButton("continue", "Cliquez suivant pour continuer")
    .print()
    .wait(
        getHtml("consent").test.complete()
            .failure( getHtml("consent").warn() )
    )
);

PennController("instructions",
    newHtml("instructions", "instructions.html")
        .print()
    ,
    newButton("continue", "Cliquez suivant pour continuer")
        .print()
        .wait()
);

PennController("practice-message",
  newText("<p>Voici les exemples d'entraînement:</p>")
    .print()
  ,
  newButton("continue", "Cliquez suivant pour continuer")
      .print()
      .wait()
);

PennController("practice1",
  defaultText.print()
  ,
  newText("<p><em>S'il vous plaît, lisez les phrases et choisissez celle qui vous semble la plus naturelle. <p>")
  ,
  newCanvas("empty", 1, 10)
    .print()
  ,
  newText("Une maman, à sa copine :")
  ,
  newCanvas("empty", 1, 10)
    .print()
  ,
  newText("Je veux que mes enfants mangent sainement, mais ...")
  ,
  newCanvas("empty", 1, 25)
    .print()
  ,
  newText("answer1", "Ils mangent souvent des bonbons")
    .settings.css("color", "blue")
    .settings.center()
  ,
  newCanvas("empty", 1, 15)
    .print()
  ,
  newText("answer2", "Ils souvent mangent des bonbons")
    .settings.css("color", "blue")
    .settings.center()
  ,
  newSelector("text")
    .settings.add(getText("answer1"), getText("answer2"))
    .shuffle()

    .settings.log()
    .wait()
)

PennController("practice2",
  defaultText.print()
  ,
  newText("<p><em>S'il vous plaît, lisez les phrases et choisissez celle qui vous semble la plus naturelle. <p>")
  ,
  newCanvas("empty", 1, 10)
    .print()
  ,
  newText("Un québécois en protestant :")
  ,
  newCanvas("empty", 1, 10)
    .print()
  ,
  newText("...")
  ,
  newCanvas("empty", 1, 25)
    .print()
  ,
  newText("answer1", "Jamais, je ne dirais cela.")
    .settings.css("color", "blue")
    .settings.center()
  ,
  newCanvas("empty", 1, 15)
    .print()
  ,
  newText("answer2", "Je dirais jamais ça.")
    .settings.css("color", "blue")
    .settings.center()
  ,
  newSelector("text")
    .settings.add(getText("answer1"), getText("answer2"))
    .shuffle()

    .settings.log()
    .wait()
);

PennController("experiment-message",
  newText("<p>Bravo! Alors on commence l'expérience.</p>")
    .print()
  ,
  newButton("continue", "Suivant")
      .print()
      .wait()
);

PennController.Template(
  variable => PennController("experiment",
    defaultText.print()
    ,
    newText("<p><em>S'il vous plaît, lisez les phrases et choisissez celle qui vous semble la plus naturelle. <p>")
    ,
    newCanvas("empty", 1, 10)
      .print()
    ,
    newText(variable.ContextText)
    ,
    newCanvas("empty", 1, 10)
      .print()
    ,
    newText(variable.InfoState)
    ,
    newCanvas("empty", 1, 25)
      .print()
    ,
    newText("answer1", variable.Option1)
      .settings.css("color", "blue")
      .settings.center()
    ,
    newCanvas("empty", 1, 15)
      .print()
    ,
    newText("answer2", variable.Option2)
      .settings.css("color", "blue")
      .settings.center()
    ,
    newSelector("text")
      .settings.add(getText("answer1"), getText("answer2"))
      .shuffle()

      .settings.log()
      .wait()
  )
);

PennController("questionnaire",
  newHtml("questionnaire", "questionnaire.html")
    .print()
  ,
  newButton("continue", "Cliquez suivant pour continuer")
      .print()
      .wait()
)
