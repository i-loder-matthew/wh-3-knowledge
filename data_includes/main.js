PennController.ResetPrefix(null);
PennController.DebugOff();

PennController.Sequence("consent", "instructions", "practice-message", "practice1", "practice2", "experiment-message", rshuffle(rshuffle("some-info" , "no-info"), rshuffle("expert", "non-expert")), "questionnaire")

PennController("consent",
  newHtml("consent", "consent.html")
    .print()
  ,
  newButton("consent-yes", "Je consens.")
    .print()
  ,
  newButton("consent-no", "Je ne consens pas.")
    .print()
  ,
  newSelector("consent-check")
    .settings.add(getButton("consent-yes"), getButton("consent-no"))
    .wait()
    .settings.log()
  ,
  getButton("consent-yes")
    .settings.hidden()
  ,
  getButton("consent-no")
    .settings.hidden()
  ,
  newButton("continue", "Cliquez suivant pour continuer")
    .print()
    .wait( getButton("consent-yes").test.clicked() )
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

  newButton("continue", "Suivant")
      .print()
      .settings.center()
      .wait()
);

PennController("practice1",
  defaultText.print()
  ,
  newText("<p><em>S'il vous plaît, lisez les phrases et en vous mettant à la place du locuteur choisissez celle qui vous semble la plus naturelle. <p>")
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
  newVar("response")
  ,
  newSelector("text")
    .settings.add(getText("answer1"), getText("answer2"))
    .shuffle()
    .settings.log()
    .wait()
    .setVar("response")
  ,
  getSelector("text")
    .test.selected(getText("answer1"))
    .success(
      newText("success", "Bravo! C'est correct.")
        .print()
    )
    .failure(
      newText("failure", "Non! Ce n'est pas correct.")
        .print()
    )
  ,
  newButton("continue", "Cliquez suivant pour continuer")
    .print()
    .wait()
)

PennController("practice2",
  defaultText.print()
  ,
  newText("<p><em>S'il vous plaît, lisez les phrases et en vous mettant à la place du locuteur choisissez celle qui vous semble la plus naturelle. <p>")
  ,
  newCanvas("empty", 1, 10)
    .print()
  ,
  newText("Un étudiant à son copain étranger :")
  ,
  newCanvas("empty", 1, 10)
    .print()
  ,
  newText("Ce n'est pas faux, mais ...")
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
  newVar("response")
  ,
  newSelector("text")
    .settings.add(getText("answer1"), getText("answer2"))
    .shuffle()

    .settings.log()
    .wait()
    .setVar("response")
  ,
  getSelector("text")
    .test.selected(getText("answer2"))
    .success(
      newText("success", "Bravo! C'est parfait!")
        .print()
    )
    .failure(
      newText("failure", "C'est possible, mais ça ne semble plus formel que l'autre choix?")
        .print()
    )
  ,
  newButton("continue", "Cliquez suivant pour continuer")
    .print()
    .wait()
);

PennController("experiment-message",
  newText("<p>Bravo! Alors maintenant on commence l'expérience</p>")
    .print()
  ,
  newButton("continue", "Suivant")
      .print()
      .settings.center()
      .wait()
);

PennController.Template(
  variable => PennController(variable.ContextType,
    defaultText.print()
    ,
    newText("<p><em>S'il vous plaît, lisez les phrases et en vous mettant à la place du locuteur choisissez celle qui vous semble la plus naturelle. <p>")
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
  newButton("continue", "SOUMETTRE")
      .print()
      .wait()
)
