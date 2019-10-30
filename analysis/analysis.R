#### ANALYSIS SCRIPT DRAFT 1 ####

## CLEANING SCRIPTS ##

library(ggplot2)
library(dplyr)
library(tidyr)
library(data.table)
library(gridExtra)
library(DescTools)
library(splines)
library(stringr)

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

## Load data 

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

df.target <- df.all %>%
  filter(
    condition == "partial-knowledge" | condition == "no-knowledge"
  ) %>%
  mutate(
    'c1' = value == "answer1"
  )

percent_in_situ = df.target %>%
  group_by(condition) %>%
  summarise('c1' = mean(c1))

## Manipulate data



