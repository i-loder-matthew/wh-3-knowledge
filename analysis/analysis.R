#### ANALYSIS SCRIPT DRAFT 1 ####

# Creat a skeleton stim file with the items, question words and any other information potentially relevant to the analysis. 

## CLEANING SCRIPTS ##

library(ggplot2)
library(dplyr)
library(tidyr)
library(data.table)
library(gridExtra)
library(DescTools)
library(splines)
library(stringr)
library(lme4)

# Function to read in data 
read.pcibex <- function(filepath, auto.colnames=TRUE, fun.col=function(col,cols){cols[cols==col]<-paste(col,"Ibex",sep=".");return(cols)}) {
  n.cols <- max(count.fields(filepath,sep=",",quote=NULL),na.rm=TRUE)
  if (auto.colnames){
    cols <- c()
    con <- file(filepath, "r")
    while ( TRUE ) {
      line <- readLines(con, n = 1, warn=FALSE)
      if ( length(line) == 0) {
        break
      }
      m <- regmatches(line,regexec("^# (\\d+)\\. (.+)\\.$",line))[[1]]
      if (length(m) == 3) {
        index <- as.numeric(m[2])
        value <- m[3]
        if (index < length(cols)){
          cols <- c()
        }
        if (is.function(fun.col)){
          cols <- fun.col(value,cols)
        }
        cols[index] <- value
        if (index == n.cols){
          break
        }
      }
    }
    close(con)
    return(read.csv(filepath, comment.char="#", header=FALSE, col.names=cols))
  }
  else{
    return(read.csv(filepath, comment.char="#", header=FALSE, col.names=seq(1:n.cols)))
  }
}

## LOAD DATA

results <- read.pcibex("results")

df.all <- results %>%
  filter(PennElementType == "Selector") %>%
  mutate(
    id = MD5.hash.of.participant.s.IP.address,
    condition = Type,
    value = Value,
    item = Item.number
  ) %>%
  select(id, condition, value, item)

## CLEAN UP TARGET DATA

df.target <- df.all %>%
  filter(
    condition == "partial-knowledge" | condition == "no-knowledge"
  ) %>%
  mutate(
    'c1' = value == "answer1"
  )

percent_in_situ = df.target %>%
  group_by(condition) %>%
  summarise('in-situ' = mean(c1))

by_participant1 = df.target %>%
  group_by(condition, id) %>%
  summarise('in-situ' = mean(c1))

by_item = df.target %>%
  group_by(item) %>%
  summarise('in-situ' = mean(c1))

df.all2 = df.all %>%
  mutate(
    'c1' = value == 'answer1'
  )

by_item_all = df.all2 %>%
  group_by(item) %>%
  summarise('in-situ' = mean(c1))

by_item_participant = df.target %>%
  group_by(item, id) %>%
  summarise('in-situ' = mean(c1))

df.partial = df.target %>%
  filter(condition == "partial-knowledge")

df.none = df.target %>% 
  filter(condition == "no-knowledge")

by_item_partial = df.partial %>%
  group_by(item) %>%
  summarise('in-situ' = mean(c1))

by_item_none = df.none %>%
  group_by(item) %>%
  summarise('in-situ' = mean(c1))


df.no_quoi = df.target %>%
  filter(item == 7 | item == 12 | item == 13 | item == 6 | item == 18 | item == 19)

percent_in_situ_no_quoi = df.no_quoi %>%
  group_by(condition) %>%
  summarise('in-situ' = mean(c1))

## ANALYZE DATA 

knowledgeability.model = lmer(c1 ~ condition + (1|id) + (1|item), data=df.target)

knowledgeability.null = lmer(c1 ~ 1 + (1|id) + (1|item), data=df.target)

summary(knowledgeability.model)
summary(knowledgeability.null)

anova(knowledgeability.null, knowledgeability.model)

know.simple = lm(c1 ~ condition, data=df.target)

summary(know.simple)








